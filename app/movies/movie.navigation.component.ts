import {Component, OnInit} from "@angular/core";
import {Router, ActivatedRoute, Params} from "@angular/router";
import {MovieService} from "./movie.service";

@Component({
  selector: 'movie-navigation',
  template: ''
})
export class MovieNavigationComponent implements OnInit {

  constructor(private movieService: MovieService,
              private router: Router,
              private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.route.params.forEach((params: Params) => {
      let action = params['action'];
      switch (action) {
        case 'create':
          this.router.navigate(['/movies/add']);
          break;
        case 'new':
          this.movieService.new().then(() => this.router.navigate(['/movies/list']));
          break;
        case 'update':
          this.movieService.updatePositions().then(() => this.router.navigate(['/movies/list']));
          break;
      }
    });
  }

}
