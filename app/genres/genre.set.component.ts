import {Component, OnInit, OnDestroy} from "@angular/core";
import {Router, ActivatedRoute, Params} from "@angular/router";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Subscription} from "rxjs";
import {Validator} from "../validator";
import {GenreService} from "./genre.service";

@Component({
  selector: 'genre-set',
  templateUrl: 'app/genres/genre.set.component.html'
})
export class GenreSetComponent implements OnInit, OnDestroy {
  genreForm: FormGroup;
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

  constructor(private formBuilder: FormBuilder,
              private genreService: GenreService,
              private router: Router,
              private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.genreForm = this.formBuilder.group({
      id: [],
      name: ['', [Validators.required]],
      position: []
    });

    this.formValueChanges = this.genreForm.valueChanges.subscribe(data => this.onValueChanged());

    this.onValueChanged();

    this.route.params.forEach((params: Params) => {
      let id = params['id'];
      if (id) {
        this.genreService.item(id).then(genre => {
          this.genreForm.controls['id'].patchValue(genre.id);
          this.genreForm.controls['name'].patchValue(genre.name);
          this.genreForm.controls['position'].patchValue(genre.position);
          this.edit = true;
          this.title = 'Edit genre';
          this.submitButtonValue = 'Update';
        });
      } else {
        this.edit = false;
        this.title = 'Add genre';
        this.submitButtonValue = 'Create';
      }
    });
  }

  ngOnDestroy(): void {
    this.formValueChanges.unsubscribe();
  }

  onSubmit() {
    if (this.edit) {
      this.genreService.update(this.genreForm.value).then(() => this.router.navigate(['/genres/list']));
    } else {
      this.genreService.add(this.genreForm.value).then(() => this.router.navigate(['/genres/list']));
    }
  }

  cancel() {
    this.router.navigate(['/genres/list']);
  }

  onValueChanged() {
    if (!this.genreForm) {
      return;
    }

    Validator.validate(this.genreForm, this.formErrors, this.validationMessages);
  }

}
