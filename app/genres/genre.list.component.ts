import {Component, OnInit} from "@angular/core";
import {Router} from "@angular/router";
import {Genre} from "./genre";
import {GenreService} from "./genre.service";

@Component({
  selector: 'genre-list',
  templateUrl: 'app/genres/genre.list.component.html'
})
export class GenreListComponent implements OnInit {

  genres: Genre[];

  constructor(private genreService: GenreService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.updateGenres();
  }

  update(genre: Genre): void {
    this.router.navigate(['/genres/edit', genre.id]);
  }

  duplicate(genre: Genre): void {
    this.genreService.duplicate(genre).then(() => this.updateGenres());
  }

  remove(genre: Genre): void {
    this.genreService.remove(genre).then(() => this.updateGenres());
  }

  moveUp(genre: Genre): void {
    this.genreService.moveUp(genre).then(() => this.updateGenres());
  }

  moveDown(genre: Genre): void {
    this.genreService.moveDown(genre).then(() => this.updateGenres());
  }

  private updateGenres(): void {
    this.genreService.list().then(genres => this.genres = genres);
  }

}
