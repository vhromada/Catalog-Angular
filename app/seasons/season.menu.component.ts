import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params} from '@angular/router';

@Component({
    selector: 'season-menu',
    templateUrl: './season.menu.component.html'
})
export class SeasonMenuComponent implements OnInit {

    showId: string;

    constructor(private route: ActivatedRoute) {
    }

    ngOnInit(): void {
        this.route.params.forEach((params: Params) => {
            this.showId = params['showId'];
        });
    }

}
