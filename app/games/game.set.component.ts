import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {Subscription} from 'rxjs';
import {Validator} from '../common/validator';
import {Game} from './game';
import {GameService} from './game.service';

@Component({
    selector: 'game-set',
    templateUrl: './game.set.component.html'
})
export class GameSetComponent implements OnInit, OnDestroy {

    gameForm: FormGroup;
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
                private gameService: GameService,
                private router: Router,
                private route: ActivatedRoute) {
    }

    ngOnInit(): void {
        this.gameForm = this.formBuilder.group({
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

        this.formValueChanges = this.gameForm.valueChanges.subscribe(data => this.onValueChanged());

        this.onValueChanged();

        this.route.params.forEach((params: Params) => {
            let id = params['id'];
            if (id) {
                this.gameService.item(id).then(game => {
                    this.gameForm.controls['id'].patchValue(game.id);
                    this.gameForm.controls['name'].patchValue(game.name);
                    this.gameForm.controls['wikiCz'].patchValue(game.wikiCz);
                    this.gameForm.controls['wikiEn'].patchValue(game.wikiEn);
                    this.gameForm.controls['mediaCount'].patchValue(game.mediaCount);
                    this.gameForm.controls['crack'].patchValue(game.crack);
                    this.gameForm.controls['serialKey'].patchValue(game.serialKey);
                    this.gameForm.controls['patch'].patchValue(game.patch);
                    this.gameForm.controls['trainer'].patchValue(game.trainer);
                    this.gameForm.controls['trainerData'].patchValue(game.trainerData);
                    this.gameForm.controls['editor'].patchValue(game.editor);
                    this.gameForm.controls['saves'].patchValue(game.saves);
                    this.gameForm.controls['otherData'].patchValue(game.otherData);
                    this.gameForm.controls['note'].patchValue(game.note);
                    this.gameForm.controls['position'].patchValue(game.position);
                    this.edit = true;
                    this.title = 'Edit game';
                    this.submitButtonValue = 'Update';
                });
            } else {
                this.edit = false;
                this.title = 'Add game';
                this.submitButtonValue = 'Create';
            }
        });

        this.returnUrl = '/games/list';
    }

    ngOnDestroy(): void {
        this.formValueChanges.unsubscribe();
    }

    onSubmit(): void {
        if (this.gameForm.valid) {
            const game = this.getGame();
            if (this.edit) {
                this.gameService.update(game).then(response => this.router.navigate([this.returnUrl]));
            } else {
                this.gameService.add(game).then(response => this.router.navigate([this.returnUrl]));
            }
        } else {
            Validator.validate(this.gameForm, this.formErrors, this.validationMessages, true);
        }
    }

    private onValueChanged(): void {
        if (!this.gameForm) {
            return;
        }

        Validator.validate(this.gameForm, this.formErrors, this.validationMessages, false);
    }

    private getGame(): Game {
        const game = new Game();
        game.id = this.gameForm.controls['id'].value;
        game.name = this.gameForm.controls['name'].value;
        game.wikiEn = this.normalizedStringValue('wikiEn');
        game.wikiCz = this.normalizedStringValue('wikiCz');
        game.mediaCount = this.gameForm.controls['mediaCount'].value;
        game.crack = this.normalizedBooleanValue('crack');
        game.serialKey = this.normalizedBooleanValue('serialKey');
        game.patch = this.normalizedBooleanValue('patch');
        game.trainer = this.normalizedBooleanValue('trainer');
        game.trainerData = this.normalizedBooleanValue('trainerData');
        game.editor = this.normalizedBooleanValue('editor');
        game.saves = this.normalizedBooleanValue('saves');
        game.otherData = this.normalizedStringValue('otherData');
        game.note = this.normalizedStringValue('note');
        game.position = this.gameForm.controls['position'].value;

        return game;
    }

    private normalizedStringValue(property: string): string {
        const control = this.gameForm.get(property);

        return control.value ? control.value : '';
    }

    private normalizedBooleanValue(property: string): boolean {
        const control = this.gameForm.get(property);

        return control.value ? control.value : false;
    }

}
