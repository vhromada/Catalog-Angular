import {Component, OnDestroy, OnInit} from "@angular/core";
import {FormArray, FormBuilder, FormGroup, ValidatorFn, Validators, FormControl} from "@angular/forms";
import {ActivatedRoute, Params, Router} from "@angular/router";
import {Subscription} from "rxjs";
import {Validator} from "../common/validator";
import {Season} from "./season";
import {SeasonService} from "./season.service";
import {LanguageService} from "../common/language.service";
import {Subtitles} from "../common/subtitles";

@Component({
    selector: 'season-set',
    templateUrl: './season.set.component.html'
})
export class SeasonSetComponent implements OnInit, OnDestroy {

    showId: number;
    seasonForm: FormGroup;
    formErrors = {
        'number': '',
        'startYear': '',
        'endYear': '',
        'language': ''
    };
    validationMessages = {
        'number': {
            'required': 'Number name must be filled.'
        },
        'startYear': {
            'required': 'Starting year name must be filled.',
            'range': 'Year must be between 1930 and 2500.',
            'years': "Starting year mustn't be greater than ending year."
        },
        'endYear': {
            'required': 'Ending year name must be filled.',
            'range': 'Year must be between 1930 and 2500.'
        },
        'language': {
            'required': 'Language name must be filled.'
        }
    };
    edit: boolean;
    title: string;
    submitButtonValue: string;
    formValueChanges: Subscription;
    languages: string[];
    returnUrl: string;

    constructor(private formBuilder: FormBuilder,
                private seasonService: SeasonService,
                private languageService: LanguageService,
                private router: Router,
                private route: ActivatedRoute) {
    }

    ngOnInit(): void {
        this.seasonForm = this.formBuilder.group({
            id: [],
            number: ['', [Validators.required]],
            startYear: [],
            endYear: ['', [Validators.required, Validator.rangeValidator(1930, 2500)]],
            language: ['', [Validators.required]],
            subtitles: this.formBuilder.array([]),
            note: [],
            position: []
        });

        this.setControlValidations('startYear', [Validators.required, Validator.rangeValidator(1930, 2500),
            Validator.yearsValidator(this.seasonForm.controls['endYear'])]);

        this.languageService.list().then(languages => this.languages = languages);
        this.languageService.subtitles().then(subtitles => {
            const subtitlesGroup = (<FormArray>this.seasonForm.controls['subtitles']);
            for (let item of subtitles) {
                const subtitle = this.formBuilder.group({
                    name: item,
                    value: []
                });
                subtitlesGroup.push(subtitle);
            }
        });

        this.formValueChanges = this.seasonForm.valueChanges.subscribe(data => this.onValueChanged());

        this.onValueChanged();

        this.route.params.forEach((params: Params) => {
            this.showId = params['showId'];
            let seasonId = params['seasonId'];
            if (seasonId) {
                this.seasonService.showId = this.showId;
                this.seasonService.item(seasonId).then(season => {
                    season.subtitles.forEach(sub => {
                        const subtitlesGroup = (<FormArray>this.seasonForm.controls['subtitles']);
                        subtitlesGroup.controls.forEach(c => {
                            let val: Subtitles = c.value;
                            if (val.name === sub) {
                                val.value = true;
                            }
                            c.patchValue(val);
                        });
                    });
                    this.seasonForm.controls['id'].patchValue(season.id);
                    this.seasonForm.controls['number'].patchValue(season.number);
                    this.seasonForm.controls['startYear'].patchValue(season.startYear);
                    this.seasonForm.controls['endYear'].patchValue(season.endYear);
                    this.seasonForm.controls['note'].patchValue(season.note);
                    this.seasonForm.controls['position'].patchValue(season.position);
                    this.edit = true;
                    this.title = 'Edit season';
                    this.submitButtonValue = 'Update';
                });
            } else {
                this.edit = false;
                this.title = 'Add season';
                this.submitButtonValue = 'Create';
            }
            this.returnUrl = '/shows/' + this.showId + '/seasons/list';
        });
    }

    ngOnDestroy(): void {
        this.formValueChanges.unsubscribe();
    }

    onSubmit(): void {
        if (this.seasonForm.valid) {
            const season = this.getSeason();
            this.seasonService.showId = this.showId;
            if (this.edit) {
                this.seasonService.update(season).then(response => this.router.navigate([this.returnUrl]));
            } else {
                this.seasonService.add(season).then(response => this.router.navigate([this.returnUrl]));
            }
        } else {
            Validator.validate(this.seasonForm, this.formErrors, this.validationMessages, true);
        }
    }

    private onValueChanged(): void {
        if (!this.seasonForm) {
            return;
        }

        Validator.validate(this.seasonForm, this.formErrors, this.validationMessages, false);
    }

    private getSeason(): Season {
        let subtitles: string[] = [];
        (<Array<Subtitles>>this.seasonForm.controls['subtitles'].value).forEach(sub => {
            if (sub.value) {
                subtitles.push(sub.name);
            }
        });

        const season = new Season();
        season.id = this.seasonForm.controls['id'].value;
        season.number = this.seasonForm.controls['number'].value;
        season.startYear = this.seasonForm.controls['startYear'].value;
        season.endYear = this.seasonForm.controls['endYear'].value;
        season.language = this.seasonForm.controls['language'].value;
        season.subtitles = subtitles;
        season.note = this.normalizedStringValue('note');
        season.position = this.seasonForm.controls['position'].value;

        return season;
    }

    private normalizedStringValue(property: string): string {
        const control = this.seasonForm.get(property);

        return control.value ? control.value : '';
    }

    private setControlValidations(controlName: string, validators: ValidatorFn[]): void {
        (<FormControl>this.seasonForm.controls[controlName]).setValidators(validators);
        (<FormControl>this.seasonForm.controls[controlName]).updateValueAndValidity();
    }

}
