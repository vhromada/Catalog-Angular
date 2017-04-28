import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, ValidatorFn, Validators} from '@angular/forms';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {Subscription} from 'rxjs';
import {LanguageService} from '../common/language.service';
import {Validator} from '../common/validator';
import {Genre} from '../genres/genre';
import {GenreService} from '../genres/genre.service';
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
        'imdbCode': ''
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
        'imdbCode': {
            'required': 'IMDB code must be filled.',
            'range': 'IMDB code must be between 1 and 9999999.'
        }
    };
    edit: boolean;
    title: string;
    submitButtonValue: string;
    formValueChanges: Subscription;
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
            language: [],
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
            genres: []
        });

        this.languageService.list().then(languages => this.languages = languages);
        this.languageService.subtitles().then(subtitles => this.subtitles = subtitles);
        this.genreService.list().then(genres => this.genres = genres);

        this.formValueChanges = this.movieForm.valueChanges.subscribe(data => this.onValueChanged());

        this.onValueChanged();

        this.route.params.forEach((params: Params) => {
            let id = params['id'];
            if (id) {
                this.movieService.item(id).then(movie => {
                    this.movieForm.controls['id'].patchValue(movie.id);
                    this.movieForm.controls['czechName'].patchValue(movie.czechName);
                    this.movieForm.controls['originalName'].patchValue(movie.originalName);
                    this.movieForm.controls['year'].patchValue(movie.year);
                    this.movieForm.controls['csfd'].patchValue(movie.csfd);
                    this.movieForm.controls['wikiCz'].patchValue(movie.wikiCz);
                    this.movieForm.controls['wikiEn'].patchValue(movie.wikiEn);
                    this.movieForm.controls['picture'].patchValue(movie.picture);
                    this.movieForm.controls['note'].patchValue(movie.note);
                    this.movieForm.controls['position'].patchValue(movie.position);
                    if (movie.imdbCode && movie.imdbCode > 0) {
                        this.movieForm.controls['imdbCode'].patchValue(movie.imdbCode);
                    }
                    this.movieForm.controls['imdb'].patchValue(this.imdb);
                    this.edit = true;
                    this.title = 'Edit movie';
                    this.submitButtonValue = 'Update';

                    this.onImdbShow();
                });
            } else {
                this.edit = false;
                this.title = 'Add movie';
                this.submitButtonValue = 'Create';

                this.onImdbShow();
            }
        });

        this.returnUrl = '/movies/list';
    }

    ngOnDestroy(): void {
        this.formValueChanges.unsubscribe();
    }

    onSubmit(): void {
        if (this.movieForm.valid) {
            this.updateValues();
            if (this.edit) {
                this.movieService.update(this.movieForm.value).then(response => this.router.navigate([this.returnUrl]));
            } else {
                this.movieService.add(this.movieForm.value).then(response => this.router.navigate([this.returnUrl]));
            }
        } else {
            Validator.validate(this.movieForm, this.formErrors, this.validationMessages, true);
        }
    }

    onImdbShow(): void {
        this.imdb = this.movieForm.controls['imdb'].value;

        if (this.imdb) {
            this.setControlValidations('imdbCode', [Validators.required, Validator.rangeValidator(1, 9999999)]);
        } else {
            this.setControlValidations('imdbCode', null);
        }
    }

    private onValueChanged(): void {
        if (!this.movieForm) {
            return;
        }

        Validator.validate(this.movieForm, this.formErrors, this.validationMessages, false);
    }

    private updateValues(): void {
        // TODO language
        this.movieForm.get('language').patchValue(this.languages[0]);
        // TODO subtitles
        this.movieForm.get('subtitles').patchValue([]);
        // TODO media
        this.movieForm.get('media').patchValue([{'number': 1, 'length': 1}]);
        // TODO genres
        this.movieForm.get('genres').patchValue([{'id': this.genres[0].id, 'name': this.genres[0].name, 'position': this.genres[0].position}]);

        if (!this.imdb) {
            this.movieForm.get('imdbCode').patchValue('-1');
        }
        this.updateStringValue('csfd');
        this.updateStringValue('wikiCz');
        this.updateStringValue('wikiEn');
        this.updateStringValue('picture');
        this.updateStringValue('note');
    }

    private updateStringValue(property: string): void {
        let control = this.movieForm.get(property);
        if (!control.value) {
            control.patchValue('');
        }
    }

    private setControlValidations(controlName: string, validators: ValidatorFn[]): void {
        (<FormControl>this.movieForm.controls[controlName]).setValidators(validators);
        (<FormControl>this.movieForm.controls[controlName]).updateValueAndValidity();
    }

}
