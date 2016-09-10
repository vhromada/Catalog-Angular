import {Component, OnInit, OnDestroy} from "@angular/core";
import {Router, ActivatedRoute, Params} from "@angular/router";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Subscription} from "rxjs";
import {Validator} from "../validator";
import {ProgramService} from "./program.service";

@Component({
  selector: 'program-set',
  templateUrl: 'app/programs/program.set.component.html'
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
      'required': 'Count of media must be filled.'
    }
  };
  edit: boolean;
  title: string;
  submitButtonValue: string;
  formValueChanges: Subscription;

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
  }

  ngOnDestroy(): void {
    this.formValueChanges.unsubscribe();
  }

  onSubmit() {
    this.updateValues();
    if (this.edit) {
      this.programService.update(this.programForm.value).then(() => this.router.navigate(['/programs/list']));
    } else {
      this.programService.add(this.programForm.value).then(() => this.router.navigate(['/programs/list']));
    }
  }

  cancel() {
    this.router.navigate(['/programs/list']);
  }

  onValueChanged() {
    if (!this.programForm) {
      return;
    }

    Validator.validate(this.programForm, this.formErrors, this.validationMessages);
  }

  updateValues() {
    this.updateStringValue('wikiCz');
    this.updateStringValue('wikiEn');
    this.updateBooleanValue('crack');
    this.updateBooleanValue('serialKey');
    this.updateBooleanValue('crack');
    this.updateStringValue('otherData');
    this.updateStringValue('note');
  }

  updateStringValue(property: string) {
    let control = this.programForm.get(property);
    if (!control.value) {
      control.patchValue('');
    }
  }

  updateBooleanValue(property: string) {
    let control = this.programForm.get(property);
    if (!control.value) {
      control.patchValue(false);
    }
  }

}
