import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {Game} from './game';
import {GameService} from './game.service';

@Component({
    selector: 'game-list',
    templateUrl: './game.list.component.html'
})
export class GameListComponent implements OnInit {

    games: Game[];
    mediaCount: number;

    constructor(private gameService: GameService,
                private router: Router) {
    }

    ngOnInit(): void {
        this.updateData();
    }

    update(game: Game): void {
        this.router.navigate(['/games/edit', game.id]);
    }

    duplicate(game: Game): void {
        this.gameService.duplicate(game).then(response => this.updateData());
    }

    remove(game: Game): void {
        this.gameService.remove(game).then(response => this.updateData());
    }

    moveUp(game: Game): void {
        this.gameService.moveUp(game).then(response => this.updateData());
    }

    moveDown(game: Game): void {
        this.gameService.moveDown(game).then(response => this.updateData());
    }

    private updateData(): void {
        this.gameService.list().then(games => this.games = games);
        this.gameService.totalMedia().then(mediaCount => this.mediaCount = mediaCount);
    }

}
