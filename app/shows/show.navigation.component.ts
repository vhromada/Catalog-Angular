import {Component, OnInit} from "@angular/core";
import {Router, ActivatedRoute, Params} from "@angular/router";
import {ShowService} from "./show.service";

@Component({
  selector: 'show-navigation',
  template: ''
})
export class ShowNavigationComponent implements OnInit {

  constructor(private showService: ShowService,
              private router: Router,
              private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.route.params.forEach((params: Params) => {
      let action = params['action'];
      switch (action) {
        case 'create':
          this.router.navigate(['/shows/add']);
          break;
        case 'new':
          this.showService.new().then(() => this.router.navigate(['/shows/list']));
          break;
        case 'update':
          this.showService.updatePositions().then(() => this.router.navigate(['/shows/list']));
          break;
      }
    });
  }

}
