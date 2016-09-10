import {Component} from "@angular/core";
import {Router} from "@angular/router";
import {ProgramService} from "./program.service";

@Component({
  selector: 'program-menu',
  templateUrl: 'app/programs/program.menu.component.html'
})
export class ProgramMenuComponent {

  constructor(private programService: ProgramService,
              private router: Router) {
  }

  newData(): void {
    this.programService.new().then(() => this.router.navigate(['/programs/update']));
  }

  add(): void {
    this.router.navigate(['/programs/add']);
  }

  updatePositions(): void {
    this.programService.updatePositions().then(() => this.router.navigate(['/programs/update']));
  }

}
