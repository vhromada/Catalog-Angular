import {Component, OnInit} from "@angular/core";
import {Genre} from "./genre";
import {GenreService} from "./genre.service";

@Component({
  selector: 'genres',
  templateUrl: 'app/genres/genres.component.html'
})
export class GenresComponent implements OnInit {
  title: 'Genres';
  genres: Genre[];

  constructor(private genreService: GenreService) {
  }

  ngOnInit(): void {
    this.updateGenres();
  }

  newData(): void {
    this.genreService.newData().then(() => this.updateGenres());
  }

  add(): void {
    let genre = new Genre();
    genre.name = 'Genre' + this.genres.length;
    this.genreService.addGenre(genre).then(() => this.updateGenres());
  }

  update(genre: Genre): void {
    this.genreService.updateGenre(genre).then(() => this.updateGenres());
  }

  duplicate(genre: Genre): void {
    this.genreService.duplicateGenre(genre).then(() => this.updateGenres());
  }

  remove(genre: Genre): void {
    this.genreService.removeGenre(genre).then(() => this.updateGenres());
  }

  moveUp(genre: Genre): void {
    this.genreService.moveUp(genre).then(() => this.updateGenres());
  }

  moveDown(genre: Genre): void {
    this.genreService.moveDown(genre).then(() => this.updateGenres());
  }

  updatePositions(): void {
    this.genreService.updatePositions().then(() => this.updateGenres());
  }

  private updateGenres(): void {
    this.genreService.getGenres().then(genres => this.genres = genres);
  }

}