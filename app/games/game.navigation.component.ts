import {Component, OnInit} from "@angular/core";
import {Router, ActivatedRoute, Params} from "@angular/router";
import {GameService} from "./game.service";

@Component({
  selector: 'game-navigation',
  template: ''
})
export class GameNavigationComponent implements OnInit {

  constructor(private gameService: GameService,
              private router: Router,
              private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.route.params.forEach((params: Params) => {
      let action = params['action'];
      switch (action) {
        case 'new':
          this.gameService.new().then(() => this.router.navigate(['/games/list']));
          break;
        case 'update':
          this.gameService.updatePositions().then(() => this.router.navigate(['/games/list']));
          break;
      }
    });
  }

}
