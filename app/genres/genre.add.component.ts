import {Component} from "@angular/core";
import {Router} from "@angular/router";
import {Genre} from "./genre";
import {GenreService} from "./genre.service";

@Component({
  selector: 'genres-add',
  templateUrl: 'genre.add.component.html'
})
export class GenreAddComponent {

  genre = new Genre();

  constructor(private genreService: GenreService,
              private router: Router) {
  }

  onSubmit() {
    this.genreService.add(this.genre).then(() => this.router.navigate(['/genres/list']));
  }

  cancel() {
    this.router.navigate(['/genres/list']);
  }

}
