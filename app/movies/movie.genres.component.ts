import {Component, Input, OnInit} from "@angular/core";
import {Movie} from "./movie";

@Component({
  selector: 'movie-genres',
  template: '{{data}}'
})
export class MovieGenresComponent implements OnInit {

  @Input()
  movie: Movie;
  data: string;

  constructor() {
  }

  ngOnInit(): void {
    if (this.movie) {
      this.data = Movie.getGenres(this.movie);
    }
  }

}
