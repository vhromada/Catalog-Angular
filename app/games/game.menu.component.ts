import {Component} from "@angular/core";
import {Router} from "@angular/router";
import {GameService} from "./game.service";

@Component({
  selector: 'game-menu',
  templateUrl: 'app/games/game.menu.component.html'
})
export class GameMenuComponent {

  constructor(private gameService: GameService,
              private router: Router) {
  }

  newData(): void {
    this.gameService.new().then(() => this.router.navigate(['/games/update']));
  }

  add(): void {
    this.router.navigate(['/games/add']);
  }

  updatePositions(): void {
    this.gameService.updatePositions().then(() => this.router.navigate(['/games/update']));
  }

}
