import {Component, OnInit} from "@angular/core";
import {Router} from "@angular/router";
import {Movie} from "./movie";
import {MovieService} from "./movie.service";
import {TimeService} from "../time.service";

@Component({
  selector: 'movie-list',
  templateUrl: 'app/movies/movie.list.component.html'
})
export class MovieListComponent implements OnInit {

  movies: Movie[];
  totalLength: string;
  mediaCount: number;

  constructor(private movieService: MovieService,
              private timeService: TimeService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.updateMovies();
  }

  update(movie: Movie): void {
    this.router.navigate(['/movies/edit', movie.id]);
  }

  duplicate(movie: Movie): void {
    this.movieService.duplicate(movie).then(() => this.updateMovies());
  }

  remove(movie: Movie): void {
    this.movieService.remove(movie).then(() => this.updateMovies());
  }

  moveUp(movie: Movie): void {
    this.movieService.moveUp(movie).then(() => this.updateMovies());
  }

  moveDown(movie: Movie): void {
    this.movieService.moveDown(movie).then(() => this.updateMovies());
  }

  private updateMovies(): void {
    this.movieService.list().then(movies => {
      let mediaCount = 0;
      let totalLength = 0;
      movies.forEach(movie => {
        totalLength += Movie.getTotalLength(movie);
        mediaCount += movie.media.length;
      });
      this.movies = movies;
      this.timeService.time(totalLength).then(time => this.totalLength = time);
      this.mediaCount = mediaCount;
    });
  }

}
