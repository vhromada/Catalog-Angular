import {Component, OnInit, OnDestroy} from "@angular/core";
import {Router, ActivatedRoute, Params} from "@angular/router";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Subscription} from "rxjs";
import {Validator} from "../validations/validator";
import {MovieService} from "./movie.service";
import {LanguageService} from "../language.service";
import {rangeValidator} from "../validations/rangevalidator";
import {Genre} from "../genres/genre";
import {GenreService} from "../genres/genre.service";

@Component({
  selector: 'movie-set',
  templateUrl: 'app/movies/movie.set.component.html'
})
export class MovieSetComponent implements OnInit, OnDestroy {

  movieForm: FormGroup;
  formErrors = {
    'czechName': '',
    'originalName': '',
    'year': ''
  };
  validationMessages = {
    'czechName': {
      'required': 'Czech name must be filled.'
    },
    'originalName': {
      'required': 'Original name must be filled.'
    },
    'year': {
      'required': 'Year must be filled.',
      'range': 'Year must be between 1930 and 2500.'
    }
  };
  edit: boolean;
  title: string;
  submitButtonValue: string;
  formValueChanges: Subscription;
  languages: string[];
  subtitles: string[];
  genres: Genre[];

  constructor(private formBuilder: FormBuilder,
              private movieService: MovieService,
              private languageService: LanguageService,
              private genreService: GenreService,
              private router: Router,
              private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.movieForm = this.formBuilder.group({
      id: [],
      czechName: ['', [Validators.required]],
      originalName: ['', [Validators.required]],
      year: ['', [Validators.required, rangeValidator(1930, 2500)]],
      language: ['', [Validators.required]],
      subtitles: [],
      media: [],
      csfd: [],
      imdbCode: [],
      wikiCz: [],
      wikiEn: [],
      picture: [],
      note: [],
      position: [],
      genres: []
    });

    this.languageService.list().then(languages => this.languages = languages);
    this.languageService.subtitles().then(subtitles => this.subtitles = subtitles);
    this.genreService.list().then(genres => this.genres = genres);

    this.formValueChanges = this.movieForm.valueChanges.subscribe(data => this.onValueChanged());

    this.onValueChanged();

    this.route.params.forEach((params: Params) => {
      let id = params['id'];
      if (id) {
        this.movieService.item(id).then(movie => {
          this.movieForm.controls['id'].patchValue(movie.id);
          this.movieForm.controls['czechName'].patchValue(movie.czechName);
          this.movieForm.controls['originalName'].patchValue(movie.originalName);
          this.movieForm.controls['year'].patchValue(movie.year);
          this.movieForm.controls['csfd'].patchValue(movie.csfd);
          this.movieForm.controls['wikiCz'].patchValue(movie.wikiCz);
          this.movieForm.controls['wikiEn'].patchValue(movie.wikiEn);
          this.movieForm.controls['picture'].patchValue(movie.picture);
          this.movieForm.controls['note'].patchValue(movie.note);
          this.movieForm.controls['position'].patchValue(movie.position);
          this.edit = true;
          this.title = 'Edit movie';
          this.submitButtonValue = 'Update';
        });
      } else {
        this.edit = false;
        this.title = 'Add movie';
        this.submitButtonValue = 'Create';
      }
    });
  }

  ngOnDestroy(): void {
    this.formValueChanges.unsubscribe();
  }

  onSubmit() {
    if (this.movieForm.valid) {
      this.updateValues();
      if (this.edit) {
        this.movieService.update(this.movieForm.value).then(() => this.router.navigate(['/movies/list']));
      } else {
        this.movieService.add(this.movieForm.value).then(() => this.router.navigate(['/movies/list']));
      }
    } else {
      Validator.validate(this.movieForm, this.formErrors, this.validationMessages, true);
    }
  }

  cancel() {
    this.router.navigate(['/movies/list']);
  }

  onValueChanged() {
    if (!this.movieForm) {
      return;
    }

    Validator.validate(this.movieForm, this.formErrors, this.validationMessages, false);
  }

  updateValues() {
    // TODO language
    this.movieForm.get('language').patchValue(this.languages[0]);
    // TODO subtitles
    this.movieForm.get('subtitles').patchValue([]);
    // TODO media
    this.movieForm.get('media').patchValue([{"number": 1, "length": 1}]);
    // TODO imdb
    this.movieForm.get('imdbCode').patchValue('-1');
    // TODO genres
    this.movieForm.get('genres').patchValue([{"id": this.genres[0].id, "name": this.genres[0].name, "position": this.genres[0].position}]);

    this.updateStringValue('csfd');
    this.updateStringValue('wikiCz');
    this.updateStringValue('wikiEn');
    this.updateStringValue('picture');
    this.updateStringValue('note');
  }

  updateStringValue(property: string) {
    let control = this.movieForm.get(property);
    if (!control.value) {
      control.patchValue('');
    }
  }

}
