import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {Subscription} from 'rxjs';
import {Time} from '../common/time';
import {Validator} from '../common/validator';
import {Episode} from './episode';
import {EpisodeService} from './episode.service';

@Component({
    selector: 'episode-set',
    templateUrl: './episode.set.component.html'
})
export class EpisodeSetComponent implements OnInit, OnDestroy {

    episodeForm: FormGroup;
    formErrors = {
        'number': '',
        'name': '',
        'hours': '',
        'minutes': '',
        'seconds': ''
    };
    validationMessages = {
        'number': {
            'required': 'Number name must be filled.'
        },
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
    showId: number;
    seasonId: number;
    returnUrl: string;

    constructor(private formBuilder: FormBuilder,
                private episodeService: EpisodeService,
                private router: Router,
                private route: ActivatedRoute) {
    }

    ngOnInit(): void {
        this.episodeForm = this.formBuilder.group({
            id: [],
            number: ['', [Validators.required]],
            name: ['', [Validators.required]],
            hours: ['', [Validators.required, Validator.rangeValidator(0, 23)]],
            minutes: ['', [Validators.required, Validator.rangeValidator(0, 59)]],
            seconds: ['', [Validators.required, Validator.rangeValidator(0, 59)]],
            length: [],
            note: [],
            position: []
        });

        this.formValueChanges = this.episodeForm.valueChanges.subscribe(data => this.onValueChanged());

        this.onValueChanged();

        this.route.params.forEach((params: Params) => {
            this.showId = params['showId'];
            this.seasonId = params['seasonId'];
            let episodeId = params['episodeId'];
            if (episodeId) {
                this.episodeService.showId = this.showId;
                this.episodeService.seasonId = this.seasonId;
                this.episodeService.item(episodeId).then(episode => {
                    const length = Time.of(episode.length);
                    this.episodeForm.controls['id'].patchValue(episode.id);
                    this.episodeForm.controls['number'].patchValue(episode.number);
                    this.episodeForm.controls['name'].patchValue(episode.name);
                    this.episodeForm.controls['hours'].patchValue(length.hours);
                    this.episodeForm.controls['minutes'].patchValue(length.minutes);
                    this.episodeForm.controls['seconds'].patchValue(length.seconds);
                    this.episodeForm.controls['note'].patchValue(episode.note);
                    this.episodeForm.controls['position'].patchValue(episode.position);
                    this.edit = true;
                    this.title = 'Edit episode';
                    this.submitButtonValue = 'Update';
                });
            } else {
                this.edit = false;
                this.title = 'Add episode';
                this.submitButtonValue = 'Create';
            }
        });

        this.returnUrl = '/shows/' + this.showId + '/seasons/' + this.seasonId + '/episodes/list';
    }

    ngOnDestroy(): void {
        this.formValueChanges.unsubscribe();
    }

    onSubmit(): void {
        if (this.episodeForm.valid) {
            const episode = this.getEpisode();
            this.episodeService.showId = this.showId;
            this.episodeService.seasonId = this.seasonId;
            if (this.edit) {
                this.episodeService.update(episode).then(response => this.router.navigate([this.returnUrl]));
            } else {
                this.episodeService.add(episode).then(response => this.router.navigate([this.returnUrl]));
            }
        } else {
            Validator.validate(this.episodeForm, this.formErrors, this.validationMessages, true);
        }
    }

    private onValueChanged(): void {
        if (!this.episodeForm) {
            return;
        }

        Validator.validate(this.episodeForm, this.formErrors, this.validationMessages, false);
    }

    private getEpisode(): Episode {
        const hours = this.episodeForm.controls['hours'].value;
        const minutes = this.episodeForm.controls['minutes'].value;
        const seconds = this.episodeForm.controls['seconds'].value;

        const episode = new Episode();
        episode.id = this.episodeForm.controls['id'].value;
        episode.number = this.episodeForm.controls['number'].value;
        episode.name = this.episodeForm.controls['name'].value;
        episode.length = new Time(hours, minutes, seconds).getLength();
        episode.note = this.normalizedStringValue('note');
        episode.position = this.episodeForm.controls['position'].value;

        return episode;
    }

    private normalizedStringValue(property: string): string {
        const control = this.episodeForm.get(property);

        return control.value ? control.value : '';
    }

}
