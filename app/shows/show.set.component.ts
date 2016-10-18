import {Component, OnInit, OnDestroy} from "@angular/core";
import {Router, ActivatedRoute, Params} from "@angular/router";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Subscription} from "rxjs";
import {Validator} from "../validations/validator";
import {ShowService} from "./show.service";
import {Genre} from "../genres/genre";
import {GenreService} from "../genres/genre.service";

@Component({
  selector: 'show-set',
  templateUrl: 'app/shows/show.set.component.html'
})
export class ShowSetComponent implements OnInit, OnDestroy {

  showForm: FormGroup;
  formErrors = {
    'czechName': '',
    'originalName': ''
  };
  validationMessages = {
    'czechName': {
      'required': 'Czech name must be filled.'
    },
    'originalName': {
      'required': 'Original name must be filled.'
    }
  };
  edit: boolean;
  title: string;
  submitButtonValue: string;
  formValueChanges: Subscription;
  genres: Genre[];

  constructor(private formBuilder: FormBuilder,
              private showService: ShowService,
              private genreService: GenreService,
              private router: Router,
              private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.showForm = this.formBuilder.group({
      id: [],
      czechName: ['', [Validators.required]],
      originalName: ['', [Validators.required]],
      csfd: [],
      imdbCode: [],
      wikiCz: [],
      wikiEn: [],
      picture: [],
      note: [],
      position: [],
      genres: []
    });

    this.genreService.list().then(genres => this.genres = genres);

    this.formValueChanges = this.showForm.valueChanges.subscribe(data => this.onValueChanged());

    this.onValueChanged();

    this.route.params.forEach((params: Params) => {
      let id = params['id'];
      if (id) {
        this.showService.item(id).then(show => {
          this.showForm.controls['id'].patchValue(show.id);
          this.showForm.controls['czechName'].patchValue(show.czechName);
          this.showForm.controls['originalName'].patchValue(show.originalName);
          this.showForm.controls['csfd'].patchValue(show.csfd);
          this.showForm.controls['wikiCz'].patchValue(show.wikiCz);
          this.showForm.controls['wikiEn'].patchValue(show.wikiEn);
          this.showForm.controls['picture'].patchValue(show.picture);
          this.showForm.controls['note'].patchValue(show.note);
          this.showForm.controls['position'].patchValue(show.position);
          this.edit = true;
          this.title = 'Edit show';
          this.submitButtonValue = 'Update';
        });
      } else {
        this.edit = false;
        this.title = 'Add show';
        this.submitButtonValue = 'Create';
      }
    });
  }

  ngOnDestroy(): void {
    this.formValueChanges.unsubscribe();
  }

  onSubmit() {
    if (this.showForm.valid) {
      this.updateValues();
      if (this.edit) {
        this.showService.update(this.showForm.value).then(() => this.router.navigate(['/shows/list']));
      } else {
        this.showService.add(this.showForm.value).then(() => this.router.navigate(['/shows/list']));
      }
    } else {
      Validator.validate(this.showForm, this.formErrors, this.validationMessages, true);
    }
  }

  cancel() {
    this.router.navigate(['/shows/list']);
  }

  onValueChanged() {
    if (!this.showForm) {
      return;
    }

    Validator.validate(this.showForm, this.formErrors, this.validationMessages, false);
  }

  updateValues() {
    // TODO imdb
    this.showForm.get('imdbCode').patchValue('-1');
    // TODO genres
    this.showForm.get('genres').patchValue([{"id": this.genres[0].id, "name": this.genres[0].name, "position": this.genres[0].position}]);

    this.updateStringValue('csfd');
    this.updateStringValue('wikiCz');
    this.updateStringValue('wikiEn');
    this.updateStringValue('picture');
    this.updateStringValue('note');
  }

  updateStringValue(property: string) {
    let control = this.showForm.get(property);
    if (!control.value) {
      control.patchValue('');
    }
  }

}
