import {Component, Input, OnInit} from '@angular/core';
import {Game} from './game';

@Component({
    selector: 'game-additional-data',
    template: '{{data}}'
})
export class GameAdditionalDataComponent implements OnInit {

    @Input()
    game: Game;
    data: string;

    ngOnInit(): void {
        if (this.game) {
            this.data = Game.getAdditionalData(this.game);
        }
    }

}
