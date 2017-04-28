import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {Subscription} from 'rxjs';
import {Validator} from '../common/validator';
import {Genre} from './genre';
import {GenreService} from './genre.service';

@Component({
    selector: 'genre-set',
    templateUrl: './genre.set.component.html'
})
export class GenreSetComponent implements OnInit, OnDestroy {

    genreForm: FormGroup;
    formErrors = {
        'name': ''
    };
    validationMessages = {
        'name': {
            'required': 'Name must be filled.'
        }
    };
    edit: boolean;
    title: string;
    submitButtonValue: string;
    formValueChanges: Subscription;
    returnUrl: string;

    constructor(private formBuilder: FormBuilder,
                private genreService: GenreService,
                private router: Router,
                private route: ActivatedRoute) {
    }

    ngOnInit(): void {
        this.genreForm = this.formBuilder.group({
            id: [],
            name: ['', [Validators.required]],
            position: []
        });

        this.formValueChanges = this.genreForm.valueChanges.subscribe(data => this.onValueChanged());

        this.onValueChanged();

        this.route.params.forEach((params: Params) => {
            let id = params['id'];
            if (id) {
                this.genreService.item(id).then(genre => {
                    this.genreForm.controls['id'].patchValue(genre.id);
                    this.genreForm.controls['name'].patchValue(genre.name);
                    this.genreForm.controls['position'].patchValue(genre.position);
                    this.edit = true;
                    this.title = 'Edit genre';
                    this.submitButtonValue = 'Update';
                });
            } else {
                this.edit = false;
                this.title = 'Add genre';
                this.submitButtonValue = 'Create';
            }
        });

        this.returnUrl = '/genres/list';
    }

    ngOnDestroy(): void {
        this.formValueChanges.unsubscribe();
    }

    onSubmit(): void {
        if (this.genreForm.valid) {
            const genre = this.getGenre();
            if (this.edit) {
                this.genreService.update(genre).then(response => this.router.navigate([this.returnUrl]));
            } else {
                this.genreService.add(genre).then(response => this.router.navigate([this.returnUrl]));
            }
        } else {
            Validator.validate(this.genreForm, this.formErrors, this.validationMessages, true);
        }
    }

    private onValueChanged(): void {
        if (!this.genreForm) {
            return;
        }

        Validator.validate(this.genreForm, this.formErrors, this.validationMessages, false);
    }

    private getGenre(): Genre {
        const genre = new Genre();
        genre.id = this.genreForm.controls['id'].value;
        genre.name = this.genreForm.controls['name'].value;
        genre.position = this.genreForm.controls['position'].value;

        return genre;
    }

}
