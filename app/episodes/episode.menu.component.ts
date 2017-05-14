import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params} from '@angular/router';

@Component({
    selector: 'episode-menu',
    templateUrl: './episode.menu.component.html'
})
export class EpisodeMenuComponent implements OnInit {

    showId: string;
    seasonId: string;

    constructor(private route: ActivatedRoute) {
    }

    ngOnInit(): void {
        this.route.params.forEach((params: Params) => {
            this.showId = params['showId'];
            this.seasonId = params['seasonId'];
        });
    }

}
