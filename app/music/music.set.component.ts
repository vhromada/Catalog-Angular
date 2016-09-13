import {Component, OnInit, OnDestroy} from "@angular/core";
import {Router, ActivatedRoute, Params} from "@angular/router";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Subscription} from "rxjs";
import {Validator} from "../validator";
import {MusicService} from "./music.service";

@Component({
  selector: 'music-set',
  templateUrl: 'app/music/music.set.component.html'
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
      'required': 'Count of media must be filled.'
    }
  };
  edit: boolean;
  title: string;
  submitButtonValue: string;
  formValueChanges: Subscription;

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
      mediaCount: ['', [Validators.required]],
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
  }

  ngOnDestroy(): void {
    this.formValueChanges.unsubscribe();
  }

  onSubmit() {
    if (this.musicForm.valid) {
      this.updateValues();
      if (this.edit) {
        this.musicService.update(this.musicForm.value).then(() => this.router.navigate(['/music/list']));
      } else {
        this.musicService.add(this.musicForm.value).then(() => this.router.navigate(['/music/list']));
      }
    } else {
      Validator.validate(this.musicForm, this.formErrors, this.validationMessages, true);
    }
  }

  cancel() {
    this.router.navigate(['/musics/list']);
  }

  onValueChanged() {
    if (!this.musicForm) {
      return;
    }

    Validator.validate(this.musicForm, this.formErrors, this.validationMessages, false);
  }

  updateValues() {
    this.updateStringValue('wikiCz');
    this.updateStringValue('wikiEn');
    this.updateStringValue('note');
  }

  updateStringValue(property: string) {
    let control = this.musicForm.get(property);
    if (!control.value) {
      control.patchValue('');
    }
  }

}
