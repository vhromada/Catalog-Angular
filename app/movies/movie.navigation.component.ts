import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {MovieService} from './movie.service';

@Component({
    selector: 'movie-navigation',
    template: ''
})
export class MovieNavigationComponent implements OnInit {

    constructor(private movieService: MovieService,
                private router: Router,
                private route: ActivatedRoute) {
    }

    ngOnInit(): void {
        const returnUrl = '/movies/list';

        this.route.params.forEach((params: Params) => {
            let action = params['action'];
            switch (action) {
                case 'new':
                    this.movieService.newData().then(response => this.router.navigate([returnUrl]));
                    break;
                case 'update':
                    this.movieService.updatePositions().then(response => this.router.navigate([returnUrl]));
                    break;
            }
        });
    }

}
