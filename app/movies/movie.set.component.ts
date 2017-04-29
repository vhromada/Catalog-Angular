import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, ValidatorFn, Validators} from '@angular/forms';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {Subscription} from 'rxjs';
import {LanguageService} from '../common/language.service';
import {Validator} from '../common/validator';
import {Genre} from '../genres/genre';
import {GenreService} from '../genres/genre.service';
import {Medium, Movie} from './movie';
import {MovieService} from './movie.service';

@Component({
    selector: 'movie-set',
    templateUrl: './movie.set.component.html'
})
export class MovieSetComponent implements OnInit, OnDestroy {

    movieForm: FormGroup;
    formErrors = {
        'czechName': '',
        'originalName': '',
        'year': '',
        'language': '',
        'imdbCode': '',
        'genres': ''
    };
    validationMessages = {
        'czechName': {
            'required': 'Czech name must be filled.'
        },
        'originalName': {
            'required': 'Original name must be filled.'
        },
        'year': {
            'required': 'Year must be filled.',
            'range': 'Year must be between 1930 and 2500.'
        },
        'language': {
            'required': 'Language name must be filled.'
        },
        'imdbCode': {
            'required': 'IMDB code must be filled.',
            'range': 'IMDB code must be between 1 and 9999999.'
        },
        'genres': {
            'required': 'At least 1 genre must be selected.'
        }
    };
    edit: boolean;
    title: string;
    submitButtonValue: string;
    formValueChanges: Subscription;
    imdbValueChanges: Subscription;
    languages: string[];
    subtitles: string[];
    genres: Genre[];
    returnUrl: string;
    imdb: boolean;

    constructor(private formBuilder: FormBuilder,
                private movieService: MovieService,
                private languageService: LanguageService,
                private genreService: GenreService,
                private router: Router,
                private route: ActivatedRoute) {
    }

    ngOnInit(): void {
        this.movieForm = this.formBuilder.group({
            id: [],
            czechName: ['', [Validators.required]],
            originalName: ['', [Validators.required]],
            year: ['', [Validators.required, Validator.rangeValidator(1930, 2500)]],
            language: ['', [Validators.required]],
            subtitles: [],
            media: [],
            csfd: [],
            imdb: [],
            imdbCode: [],
            wikiCz: [],
            wikiEn: [],
            picture: [],
            note: [],
            position: [],
            genres: ['', [Validators.required]]
        });

        this.languageService.list().then(languages => this.languages = languages);
        this.languageService.subtitles().then(subtitles => this.subtitles = subtitles);
        this.genreService.list().then(genres => this.genres = genres);

        this.formValueChanges = this.movieForm.valueChanges.subscribe(data => this.onValueChanged());
        this.imdbValueChanges = this.movieForm.controls['imdb'].valueChanges.subscribe(data => this.onImdbChanged());

        this.onValueChanged();
        this.onImdbChanged();

        this.route.params.forEach((params: Params) => {
            let id = params['id'];
            if (id) {
                this.movieService.item(id).then(movie => {
                    // TODO vladimir.hromada 12.04.2017: subtitles
                    // TODO vladimir.hromada 12.04.2017: media
                    this.movieForm.controls['id'].patchValue(movie.id);
                    this.movieForm.controls['czechName'].patchValue(movie.czechName);
                    this.movieForm.controls['originalName'].patchValue(movie.originalName);
                    this.movieForm.controls['year'].patchValue(movie.year);
                    this.movieForm.controls['language'].patchValue(movie.language);
                    this.movieForm.controls['csfd'].patchValue(movie.csfd);
                    this.movieForm.controls['wikiCz'].patchValue(movie.wikiCz);
                    this.movieForm.controls['wikiEn'].patchValue(movie.wikiEn);
                    this.movieForm.controls['picture'].patchValue(movie.picture);
                    this.movieForm.controls['note'].patchValue(movie.note);
                    this.movieForm.controls['position'].patchValue(movie.position);
                    if (movie.imdbCode && movie.imdbCode > 0) {
                        this.movieForm.controls['imdbCode'].patchValue(movie.imdbCode);
                        this.movieForm.controls['imdb'].patchValue(true);
                    } else {
                        this.movieForm.controls['imdb'].patchValue(false);
                    }
                    this.movieForm.controls['genres'].patchValue(movie.genres.map(genre => this.getGenreIndex(genre)));
                    this.edit = true;
                    this.title = 'Edit movie';
                    this.submitButtonValue = 'Update';
                });
            } else {
                this.edit = false;
                this.title = 'Add movie';
                this.submitButtonValue = 'Create';
            }
        });

        this.returnUrl = '/movies/list';
    }

    ngOnDestroy(): void {
        this.formValueChanges.unsubscribe();
        this.imdbValueChanges.unsubscribe();
    }

    onSubmit(): void {
        if (this.movieForm.valid) {
            const movie = this.getMovie();
            if (this.edit) {
                this.movieService.update(movie).then(response => this.router.navigate([this.returnUrl]));
            } else {
                this.movieService.add(movie).then(response => this.router.navigate([this.returnUrl]));
            }
        } else {
            Validator.validate(this.movieForm, this.formErrors, this.validationMessages, true);
        }
    }

    private onValueChanged(): void {
        if (!this.movieForm) {
            return;
        }

        Validator.validate(this.movieForm, this.formErrors, this.validationMessages, false);
    }

    private onImdbChanged(): void {
        if (!this.movieForm) {
            return;
        }

        this.imdb = this.movieForm.controls['imdb'].value;

        if (this.imdb) {
            this.setControlValidations('imdbCode', [Validators.required, Validator.rangeValidator(1, 9999999)]);
        } else {
            this.setControlValidations('imdbCode', null);
        }
    }

    private getGenreIndex(genre: Genre): number {
        let genreIndex = -1;
        this.genres.forEach((value, index) => {
            if (genreIndex < 0 && Genre.equals(genre, value)) {
                genreIndex = index;
            }
        });

        return genreIndex;
    }

    private getMovie(): Movie {
        const genres: number[] = [];
        this.movieForm.controls['genres'].value.forEach(function (genre: number) {
            genres.push(genre);
        });

        // TODO media
        const medium = new Medium();
        medium.number = 1;
        medium.length = 1;

        const movie = new Movie();
        movie.id = this.movieForm.controls['id'].value;
        movie.czechName = this.movieForm.controls['czechName'].value;
        movie.originalName = this.movieForm.controls['originalName'].value;
        movie.year = this.movieForm.controls['year'].value;
        movie.language = this.movieForm.controls['language'].value;
        // TODO subtitles
        movie.subtitles = [];
        // TODO media
        movie.media = [medium];
        movie.csfd = this.normalizedStringValue('csfd');
        if (this.imdb) {
            movie.imdbCode = this.movieForm.controls['imdbCode'].value;
        } else {
            movie.imdbCode = -1;
        }
        movie.wikiEn = this.normalizedStringValue('wikiEn');
        movie.wikiCz = this.normalizedStringValue('wikiCz');
        movie.picture = this.normalizedStringValue('picture');
        movie.note = this.normalizedStringValue('note');
        movie.position = this.movieForm.controls['position'].value;
        movie.genres = genres.map(index => this.genres[index]);

        return movie;
    }

    private normalizedStringValue(property: string): string {
        const control = this.movieForm.get(property);

        return control.value ? control.value : '';
    }

    private setControlValidations(controlName: string, validators: ValidatorFn[]): void {
        (<FormControl>this.movieForm.controls[controlName]).setValidators(validators);
        (<FormControl>this.movieForm.controls[controlName]).updateValueAndValidity();
    }

}
