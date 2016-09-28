import {Component} from "@angular/core";
import {Router} from "@angular/router";
import {MovieService} from "./movie.service";

@Component({
  selector: 'movie-menu',
  templateUrl: 'app/movies/movie.menu.component.html'
})
export class MovieMenuComponent {

  constructor(private movieService: MovieService,
              private router: Router) {
  }

  newData(): void {
    this.movieService.new().then(() => this.router.navigate(['/movies/update']));
  }

  add(): void {
    this.router.navigate(['/movies/add']);
  }

  updatePositions(): void {
    this.movieService.updatePositions().then(() => this.router.navigate(['/movies/update']));
  }

}
