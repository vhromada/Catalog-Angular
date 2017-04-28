import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {Subscription} from 'rxjs';
import {Validator} from '../common/validator';
import {Music} from './music';
import {MusicService} from './music.service';

@Component({
    selector: 'music-set',
    templateUrl: './music.set.component.html'
})
export class MusicSetComponent implements OnInit, OnDestroy {

    musicForm: FormGroup;
    formErrors = {
        'name': '',
        'mediaCount': ''
    };
    validationMessages = {
        'name': {
            'required': 'Name must be filled.'
        },
        'mediaCount': {
            'required': 'Count of media must be filled.',
            'range': 'Count of media must be between 1 and 100.'
        }
    };
    edit: boolean;
    title: string;
    submitButtonValue: string;
    formValueChanges: Subscription;
    returnUrl: string;

    constructor(private formBuilder: FormBuilder,
                private musicService: MusicService,
                private router: Router,
                private route: ActivatedRoute) {
    }

    ngOnInit(): void {
        this.musicForm = this.formBuilder.group({
            id: [],
            name: ['', [Validators.required]],
            wikiCz: [],
            wikiEn: [],
            mediaCount: ['', [Validators.required, Validator.rangeValidator(1, 100)]],
            note: [],
            position: []
        });

        this.formValueChanges = this.musicForm.valueChanges.subscribe(data => this.onValueChanged());

        this.onValueChanged();

        this.route.params.forEach((params: Params) => {
            let id = params['id'];
            if (id) {
                this.musicService.item(id).then(music => {
                    this.musicForm.controls['id'].patchValue(music.id);
                    this.musicForm.controls['name'].patchValue(music.name);
                    this.musicForm.controls['wikiCz'].patchValue(music.wikiCz);
                    this.musicForm.controls['wikiEn'].patchValue(music.wikiEn);
                    this.musicForm.controls['mediaCount'].patchValue(music.mediaCount);
                    this.musicForm.controls['note'].patchValue(music.note);
                    this.musicForm.controls['position'].patchValue(music.position);
                    this.edit = true;
                    this.title = 'Edit music';
                    this.submitButtonValue = 'Update';
                });
            } else {
                this.edit = false;
                this.title = 'Add music';
                this.submitButtonValue = 'Create';
            }
        });

        this.returnUrl = '/music/list';
    }

    ngOnDestroy(): void {
        this.formValueChanges.unsubscribe();
    }

    onSubmit(): void {
        if (this.musicForm.valid) {
            const music = this.getMusic();
            if (this.edit) {
                this.musicService.update(music).then(response => this.router.navigate([this.returnUrl]));
            } else {
                this.musicService.add(music).then(response => this.router.navigate([this.returnUrl]));
            }
        } else {
            Validator.validate(this.musicForm, this.formErrors, this.validationMessages, true);
        }
    }

    private onValueChanged(): void {
        if (!this.musicForm) {
            return;
        }

        Validator.validate(this.musicForm, this.formErrors, this.validationMessages, false);
    }

    private getMusic(): Music {
        const music = new Music();
        music.id = this.musicForm.controls['id'].value;
        music.name = this.musicForm.controls['name'].value;
        music.wikiEn = this.normalizedStringValue('wikiEn');
        music.wikiCz = this.normalizedStringValue('wikiCz');
        music.mediaCount = this.musicForm.controls['mediaCount'].value;
        music.note = this.normalizedStringValue('note');
        music.position = this.musicForm.controls['position'].value;

        return music;
    }

    private normalizedStringValue(property: string): string {
        const control = this.musicForm.get(property);

        return control.value ? control.value : '';
    }

}
