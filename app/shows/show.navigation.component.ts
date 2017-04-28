import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {ShowService} from './show.service';

@Component({
    selector: 'show-navigation',
    template: ''
})
export class ShowNavigationComponent implements OnInit {

    constructor(private showService: ShowService,
                private router: Router,
                private route: ActivatedRoute) {
    }

    ngOnInit(): void {
        const returnUrl = '/shows/list';

        this.route.params.forEach((params: Params) => {
            let action = params['action'];
            switch (action) {
                case 'new':
                    this.showService.newData().then(response => this.router.navigate([returnUrl]));
                    break;
                case 'update':
                    this.showService.updatePositions().then(response => this.router.navigate([returnUrl]));
                    break;
            }
        });
    }

}
