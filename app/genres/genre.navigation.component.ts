import {Component, OnInit} from "@angular/core";
import {Router, ActivatedRoute, Params} from "@angular/router";
import {GenreService} from "./genre.service";

@Component({
  selector: 'genre-navigation',
  template: ''
})
export class GenreNavigationComponent implements OnInit {

  constructor(private genreService: GenreService,
              private router: Router,
              private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.route.params.forEach((params: Params) => {
      let action = params['action'];
      switch (action) {
        case 'new':
          this.genreService.new().then(() => this.router.navigate(['/genres/list']));
          break;
        case 'update':
          this.genreService.updatePositions().then(() => this.router.navigate(['/genres/list']));
          break;
      }
    });
  }

}
