import {Component, OnInit, OnDestroy} from "@angular/core";
import {Router, ActivatedRoute, Params} from "@angular/router";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Subscription} from "rxjs";
import {Validator} from "../validator";
import {GameService} from "./game.service";

@Component({
  selector: 'game-set',
  templateUrl: 'app/games/game.set.component.html'
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
      'required': 'Count of media must be filled.'
    }
  };
  edit: boolean;
  title: string;
  submitButtonValue: string;
  formValueChanges: Subscription;

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
      mediaCount: ['', [Validators.required]],
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
  }

  ngOnDestroy(): void {
    this.formValueChanges.unsubscribe();
  }

  onSubmit() {
    if (this.gameForm.valid) {
      this.updateValues();
      if (this.edit) {
        this.gameService.update(this.gameForm.value).then(() => this.router.navigate(['/games/list']));
      } else {
        this.gameService.add(this.gameForm.value).then(() => this.router.navigate(['/games/list']));
      }
    } else {
      Validator.validate(this.gameForm, this.formErrors, this.validationMessages, true);
    }
  }

  cancel() {
    this.router.navigate(['/games/list']);
  }

  onValueChanged() {
    if (!this.gameForm) {
      return;
    }

    Validator.validate(this.gameForm, this.formErrors, this.validationMessages, false);
  }

  updateValues() {
    this.updateStringValue('wikiCz');
    this.updateStringValue('wikiEn');
    this.updateBooleanValue('crack');
    this.updateBooleanValue('serialKey');
    this.updateBooleanValue('patch');
    this.updateBooleanValue('trainer');
    this.updateBooleanValue('trainerData');
    this.updateBooleanValue('editor');
    this.updateBooleanValue('saves');
    this.updateBooleanValue('crack');
    this.updateStringValue('otherData');
    this.updateStringValue('note');
  }

  updateStringValue(property: string) {
    let control = this.gameForm.get(property);
    if (!control.value) {
      control.patchValue('');
    }
  }

  updateBooleanValue(property: string) {
    let control = this.gameForm.get(property);
    if (!control.value) {
      control.patchValue(false);
    }
  }

}
