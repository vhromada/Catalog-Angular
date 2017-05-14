import {Component, OnInit} from "@angular/core";
import {ActivatedRoute, Params, Router} from "@angular/router";
import {SeasonService} from "./season.service";

@Component({
    selector: 'season-navigation',
    template: ''
})
export class SeasonNavigationComponent implements OnInit {

    constructor(private seasonService: SeasonService,
                private router: Router,
                private route: ActivatedRoute) {
    }

    ngOnInit(): void {
        this.route.params.forEach((params: Params) => {
            const showId = params['showId'];
            const returnUrl = 'shows/' + showId + '/seasons/list';
            let action = params['action'];
            switch (action) {
                case 'new':
                    this.seasonService.newData().then(response => this.router.navigate([returnUrl]));
                    break;
                case 'update':
                    this.seasonService.updatePositions().then(response => this.router.navigate([returnUrl]));
                    break;
            }
        });
    }

}
