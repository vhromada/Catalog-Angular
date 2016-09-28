import {Component, Input, OnInit} from "@angular/core";
import {Movie} from "./movie";
import {TimeService} from "../time.service";

@Component({
  selector: 'movie-length',
  template: '{{data}}'
})
export class MovieLengthComponent implements OnInit {

  @Input()
  movie: Movie;
  data: string;

  constructor(private timeService: TimeService) {
  }

  ngOnInit(): void {
    if (this.movie) {
      this.timeService.time(Movie.getTotalLength(this.movie)).then(time => this.data = time)
    }
  }

}
