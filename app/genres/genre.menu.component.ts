import {Component} from "@angular/core";
import {Router} from "@angular/router";
import {GenreService} from "./genre.service";

@Component({
  selector: 'genre-menu',
  templateUrl: 'app/genres/genre.menu.component.html'
})
export class GenreMenuComponent {

  constructor(private genreService: GenreService,
              private router: Router) {
  }

  newData(): void {
    this.genreService.new().then(() => this.router.navigate(['/genres/update']));
  }

  add(): void {
    this.router.navigate(['/genres/add']);
  }

  updatePositions(): void {
    this.genreService.updatePositions().then(() => this.router.navigate(['/genres/update']));
  }

}
