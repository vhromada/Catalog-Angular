import {Component, OnInit} from "@angular/core";
import {Router, ActivatedRoute, Params} from "@angular/router";
import {ProgramService} from "./program.service";

@Component({
  selector: 'program-navigation',
  template: ''
})
export class ProgramNavigationComponent implements OnInit {

  constructor(private programService: ProgramService,
              private router: Router,
              private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.route.params.forEach((params: Params) => {
      let action = params['action'];
      switch (action) {
        case 'new':
          this.programService.new().then(() => this.router.navigate(['/programs/list']));
          break;
        case 'update':
          this.programService.updatePositions().then(() => this.router.navigate(['/programs/list']));
          break;
      }
    });
  }

}
