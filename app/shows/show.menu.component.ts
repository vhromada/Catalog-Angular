import {Component} from "@angular/core";
import {Router} from "@angular/router";
import {ShowService} from "./show.service";

@Component({
  selector: 'show-menu',
  templateUrl: 'app/shows/show.menu.component.html'
})
export class ShowMenuComponent {

  constructor(private showService: ShowService,
              private router: Router) {
  }

  newData(): void {
    this.showService.new().then(() => this.router.navigate(['/shows/update']));
  }

  add(): void {
    this.router.navigate(['/shows/add']);
  }

  updatePositions(): void {
    this.showService.updatePositions().then(() => this.router.navigate(['/shows/update']));
  }

}
