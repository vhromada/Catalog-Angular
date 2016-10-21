import {Component, OnInit, OnDestroy} from "@angular/core";
import {Router, ActivatedRoute, Params} from "@angular/router";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Subscription} from "rxjs";
import {Validator} from "../validations/validator";
import {SongService} from "./song.service";

@Component({
  selector: 'song-set',
  templateUrl: 'app/songs/song.set.component.html'
})
export class SongSetComponent implements OnInit, OnDestroy {

  songForm: FormGroup;
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
  musicId: number;

  constructor(private formBuilder: FormBuilder,
              private songService: SongService,
              private router: Router,
              private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.songForm = this.formBuilder.group({
      id: [],
      name: ['', [Validators.required]],
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
          this.songForm.controls['id'].patchValue(song.id);
          this.songForm.controls['name'].patchValue(song.name);
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
  }

  ngOnDestroy(): void {
    this.formValueChanges.unsubscribe();
  }

  onSubmit() {
    if (this.songForm.valid) {
      this.updateValues();
      this.songService.musicId = this.musicId;
      if (this.edit) {
        this.songService.update(this.songForm.value).then(() => this.router.navigate(['/music/' + this.musicId + '/songs/list']));
      } else {
        this.songService.add(this.songForm.value).then(() => this.router.navigate(['/music/' + this.musicId + '/songs/list']));
      }
    } else {
      Validator.validate(this.songForm, this.formErrors, this.validationMessages, true);
    }
  }

  cancel() {
    this.router.navigate(['/music/' + this.musicId + '/songs/list']);
  }

  onValueChanged() {
    if (!this.songForm) {
      return;
    }

    Validator.validate(this.songForm, this.formErrors, this.validationMessages, false);
  }

  updateValues() {
    // TODO length
    this.songForm.get('length').patchValue(1);

    this.updateStringValue('note');
  }

  updateStringValue(property: string) {
    let control = this.songForm.get(property);
    if (!control.value) {
      control.patchValue('');
    }
  }

}
