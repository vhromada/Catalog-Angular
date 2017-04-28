import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {Subscription} from 'rxjs';
import {Time} from '../common/time';
import {Validator} from '../common/validator';
import {Song} from './song';
import {SongService} from './song.service';

@Component({
    selector: 'song-set',
    templateUrl: './song.set.component.html'
})
export class SongSetComponent implements OnInit, OnDestroy {

    songForm: FormGroup;
    formErrors = {
        'name': '',
        'hours': '',
        'minutes': '',
        'seconds': ''
    };
    validationMessages = {
        'name': {
            'required': 'Name must be filled.'
        },
        'hours': {
            'required': 'Hours must be filled.',
            'range': 'Hours must be between 0 and 23.'
        },
        'minutes': {
            'required': 'Minutes must be filled.',
            'range': 'Minutes must be between 0 and 59.'
        },
        'seconds': {
            'required': 'Seconds must be filled.',
            'range': 'Seconds must be between 0 and 59.'
        }
    };
    edit: boolean;
    title: string;
    submitButtonValue: string;
    formValueChanges: Subscription;
    musicId: number;
    returnUrl: string;

    constructor(private formBuilder: FormBuilder,
                private songService: SongService,
                private router: Router,
                private route: ActivatedRoute) {
    }

    ngOnInit(): void {
        this.songForm = this.formBuilder.group({
            id: [],
            name: ['', [Validators.required]],
            hours: ['', [Validators.required, Validator.rangeValidator(0, 23)]],
            minutes: ['', [Validators.required, Validator.rangeValidator(0, 59)]],
            seconds: ['', [Validators.required, Validator.rangeValidator(0, 59)]],
            length: [],
            note: [],
            position: []
        });

        this.formValueChanges = this.songForm.valueChanges.subscribe(data => this.onValueChanged());

        this.onValueChanged();

        this.route.params.forEach((params: Params) => {
            this.musicId = params['musicId'];
            let songId = params['songId'];
            if (songId) {
                this.songService.musicId = this.musicId;
                this.songService.item(songId).then(song => {
                    const length = Time.of(song.length);
                    this.songForm.controls['id'].patchValue(song.id);
                    this.songForm.controls['name'].patchValue(song.name);
                    this.songForm.controls['hours'].patchValue(length.hours);
                    this.songForm.controls['minutes'].patchValue(length.minutes);
                    this.songForm.controls['seconds'].patchValue(length.seconds);
                    this.songForm.controls['note'].patchValue(song.note);
                    this.songForm.controls['position'].patchValue(song.position);
                    this.edit = true;
                    this.title = 'Edit song';
                    this.submitButtonValue = 'Update';
                });
            } else {
                this.edit = false;
                this.title = 'Add song';
                this.submitButtonValue = 'Create';
            }
        });

        this.returnUrl = '/music/' + this.musicId + '/songs/list';
    }

    ngOnDestroy(): void {
        this.formValueChanges.unsubscribe();
    }

    onSubmit(): void {
        if (this.songForm.valid) {
            const song = this.getSong();
            this.songService.musicId = this.musicId;
            if (this.edit) {
                this.songService.update(song).then(response => this.router.navigate([this.returnUrl]));
            } else {
                this.songService.add(song).then(response => this.router.navigate([this.returnUrl]));
            }
        } else {
            Validator.validate(this.songForm, this.formErrors, this.validationMessages, true);
        }
    }

    private onValueChanged(): void {
        if (!this.songForm) {
            return;
        }

        Validator.validate(this.songForm, this.formErrors, this.validationMessages, false);
    }

    private getSong(): Song {
        const hours = this.songForm.controls['hours'].value;
        const minutes = this.songForm.controls['minutes'].value;
        const seconds = this.songForm.controls['seconds'].value;

        const song = new Song();
        song.id = this.songForm.controls['id'].value;
        song.name = this.songForm.controls['name'].value;
        song.length = new Time(hours, minutes, seconds).getLength();
        song.note = this.normalizedStringValue('note');
        song.position = this.songForm.controls['position'].value;

        return song;
    }

    private normalizedStringValue(property: string): string {
        const control = this.songForm.get(property);

        return control.value ? control.value : '';
    }

}
