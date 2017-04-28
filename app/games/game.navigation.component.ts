import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {GameService} from './game.service';

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
        const returnUrl = '/games/list';

        this.route.params.forEach((params: Params) => {
            let action = params['action'];
            switch (action) {
                case 'new':
                    this.gameService.newData().then(response => this.router.navigate([returnUrl]));
                    break;
                case 'update':
                    this.gameService.updatePositions().then(response => this.router.navigate([returnUrl]));
                    break;
            }
        });
    }

}
