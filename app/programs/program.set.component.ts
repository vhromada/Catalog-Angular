import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {Subscription} from 'rxjs';
import {Validator} from '../common/validator';
import {Program} from './program';
import {ProgramService} from './program.service';

@Component({
    selector: 'program-set',
    templateUrl: './program.set.component.html'
})
export class ProgramSetComponent implements OnInit, OnDestroy {

    programForm: FormGroup;
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
                private programService: ProgramService,
                private router: Router,
                private route: ActivatedRoute) {
    }

    ngOnInit(): void {
        this.programForm = this.formBuilder.group({
            id: [],
            name: ['', [Validators.required]],
            wikiCz: [],
            wikiEn: [],
            mediaCount: ['', [Validators.required, Validator.rangeValidator(1, 100)]],
            crack: [],
            serialKey: [],
            patch: [],
            trainer: [],
            trainerData: [],
            editor: [],
            saves: [],
            otherData: [],
            note: [],
            position: []
        });

        this.formValueChanges = this.programForm.valueChanges.subscribe(data => this.onValueChanged());

        this.onValueChanged();

        this.route.params.forEach((params: Params) => {
            let id = params['id'];
            if (id) {
                this.programService.item(id).then(program => {
                    this.programForm.controls['id'].patchValue(program.id);
                    this.programForm.controls['name'].patchValue(program.name);
                    this.programForm.controls['wikiCz'].patchValue(program.wikiCz);
                    this.programForm.controls['wikiEn'].patchValue(program.wikiEn);
                    this.programForm.controls['mediaCount'].patchValue(program.mediaCount);
                    this.programForm.controls['crack'].patchValue(program.crack);
                    this.programForm.controls['serialKey'].patchValue(program.serialKey);
                    this.programForm.controls['otherData'].patchValue(program.otherData);
                    this.programForm.controls['note'].patchValue(program.note);
                    this.programForm.controls['position'].patchValue(program.position);
                    this.edit = true;
                    this.title = 'Edit programs';
                    this.submitButtonValue = 'Update';
                });
            } else {
                this.edit = false;
                this.title = 'Add programs';
                this.submitButtonValue = 'Create';
            }
        });

        this.returnUrl = '/programs/list';
    }

    ngOnDestroy(): void {
        this.formValueChanges.unsubscribe();
    }

    onSubmit(): void {
        if (this.programForm.valid) {
            const program = this.getProgram();
            if (this.edit) {
                this.programService.update(program).then(response => this.router.navigate([this.returnUrl]));
            } else {
                this.programService.add(program).then(response => this.router.navigate([this.returnUrl]));
            }
        } else {
            Validator.validate(this.programForm, this.formErrors, this.validationMessages, true);
        }
    }

    private onValueChanged(): void {
        if (!this.programForm) {
            return;
        }

        Validator.validate(this.programForm, this.formErrors, this.validationMessages, false);
    }

    private getProgram(): Program {
        const program = new Program();
        program.id = this.programForm.controls['id'].value;
        program.name = this.programForm.controls['name'].value;
        program.wikiEn = this.normalizedStringValue('wikiEn');
        program.wikiCz = this.normalizedStringValue('wikiCz');
        program.mediaCount = this.programForm.controls['mediaCount'].value;
        program.crack = this.normalizedBooleanValue('crack');
        program.serialKey = this.normalizedBooleanValue('serialKey');
        program.otherData = this.normalizedStringValue('otherData');
        program.note = this.normalizedStringValue('note');
        program.position = this.programForm.controls['position'].value;

        return program;
    }

    private normalizedStringValue(property: string): string {
        const control = this.programForm.get(property);

        return control.value ? control.value : '';
    }

    private normalizedBooleanValue(property: string): boolean {
        const control = this.programForm.get(property);

        return control.value ? control.value : false;
    }

}
