import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params} from '@angular/router';

@Component({
    selector: 'song-menu',
    templateUrl: './song.menu.component.html'
})
export class SongMenuComponent implements OnInit {

    musicId: string;

    constructor(private route: ActivatedRoute) {
    }

    ngOnInit(): void {
        this.route.params.forEach((params: Params) => {
            this.musicId = params['musicId'];
        });
    }

}
