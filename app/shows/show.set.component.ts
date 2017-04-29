import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, ValidatorFn, Validators} from '@angular/forms';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {Subscription} from 'rxjs';
import {Validator} from '../common/validator';
import {Genre} from '../genres/genre';
import {GenreService} from '../genres/genre.service';
import {Show} from './show';
import {ShowService} from './show.service';

@Component({
    selector: 'show-set',
    templateUrl: './show.set.component.html'
})
export class ShowSetComponent implements OnInit, OnDestroy {

    showForm: FormGroup;
    formErrors = {
        'czechName': '',
        'originalName': '',
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
    genres: Genre[];
    returnUrl: string;
    imdb: boolean;

    constructor(private formBuilder: FormBuilder,
                private showService: ShowService,
                private genreService: GenreService,
                private router: Router,
                private route: ActivatedRoute) {
    }

    ngOnInit(): void {
        this.showForm = this.formBuilder.group({
            id: [],
            czechName: ['', [Validators.required]],
            originalName: ['', [Validators.required]],
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

        this.genreService.list().then(genres => this.genres = genres);

        this.formValueChanges = this.showForm.valueChanges.subscribe(data => this.onValueChanged());
        this.imdbValueChanges = this.showForm.controls['imdb'].valueChanges.subscribe(data => this.onImdbChanged());

        this.onValueChanged();
        this.onImdbChanged();

        this.route.params.forEach((params: Params) => {
            let id = params['id'];
            if (id) {
                this.showService.item(id).then(show => {
                    this.showForm.controls['id'].patchValue(show.id);
                    this.showForm.controls['czechName'].patchValue(show.czechName);
                    this.showForm.controls['originalName'].patchValue(show.originalName);
                    this.showForm.controls['csfd'].patchValue(show.csfd);
                    this.showForm.controls['wikiCz'].patchValue(show.wikiCz);
                    this.showForm.controls['wikiEn'].patchValue(show.wikiEn);
                    this.showForm.controls['picture'].patchValue(show.picture);
                    this.showForm.controls['note'].patchValue(show.note);
                    this.showForm.controls['position'].patchValue(show.position);
                    if (show.imdbCode && show.imdbCode > 0) {
                        this.showForm.controls['imdbCode'].patchValue(show.imdbCode);
                        this.showForm.controls['imdb'].patchValue(true);
                    } else {
                        this.showForm.controls['imdb'].patchValue(false);
                    }
                    this.showForm.controls['genres'].patchValue(show.genres.map(genre => this.getGenreIndex(genre)));
                    this.edit = true;
                    this.title = 'Edit show';
                    this.submitButtonValue = 'Update';
                });
            } else {
                this.edit = false;
                this.title = 'Add show';
                this.submitButtonValue = 'Create';
            }
        });

        this.returnUrl = '/shows/list';
    }

    ngOnDestroy(): void {
        this.formValueChanges.unsubscribe();
        this.imdbValueChanges.unsubscribe();
    }

    onSubmit(): void {
        if (this.showForm.valid) {
            const show = this.getShow();
            if (this.edit) {
                this.showService.update(show).then(response => this.router.navigate([this.returnUrl]));
            } else {
                this.showService.add(show).then(response => this.router.navigate([this.returnUrl]));
            }
        } else {
            Validator.validate(this.showForm, this.formErrors, this.validationMessages, true);
        }
    }

    private onValueChanged(): void {
        if (!this.showForm) {
            return;
        }

        Validator.validate(this.showForm, this.formErrors, this.validationMessages, false);
    }

    private onImdbChanged(): void {
        if (!this.showForm) {
            return;
        }

        this.imdb = this.showForm.controls['imdb'].value;

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

    private getShow(): Show {
        const genres: number[] = [];
        this.showForm.controls['genres'].value.forEach(function (genre: number) {
            genres.push(genre);
        });

        const show = new Show();
        show.id = this.showForm.controls['id'].value;
        show.czechName = this.showForm.controls['czechName'].value;
        show.originalName = this.showForm.controls['originalName'].value;
        show.csfd = this.normalizedStringValue('csfd');
        if (this.imdb) {
            show.imdbCode = this.showForm.controls['imdbCode'].value;
        } else {
            show.imdbCode = -1;
        }
        show.wikiEn = this.normalizedStringValue('wikiEn');
        show.wikiCz = this.normalizedStringValue('wikiCz');
        show.picture = this.normalizedStringValue('picture');
        show.note = this.normalizedStringValue('note');
        show.position = this.showForm.controls['position'].value;
        show.genres = genres.map(index => this.genres[index]);

        return show;
    }

    private normalizedStringValue(property: string): string {
        const control = this.showForm.get(property);

        return control.value ? control.value : '';
    }

    private setControlValidations(controlName: string, validators: ValidatorFn[]): void {
        (<FormControl>this.showForm.controls[controlName]).setValidators(validators);
        (<FormControl>this.showForm.controls[controlName]).updateValueAndValidity();
    }

}
