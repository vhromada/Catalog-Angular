import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {GenreService} from './genre.service';

@Component({
    selector: 'genre-navigation',
    template: ''
})
export class GenreNavigationComponent implements OnInit {

    constructor(private genreService: GenreService,
                private router: Router,
                private route: ActivatedRoute) {
    }

    ngOnInit(): void {
        const returnUrl = '/genres/list';

        this.route.params.forEach((params: Params) => {
            let action = params['action'];
            switch (action) {
                case 'new':
                    this.genreService.newData().then(response => this.router.navigate([returnUrl]));
                    break;
                case 'update':
                    this.genreService.updatePositions().then(response => this.router.navigate([returnUrl]));
                    break;
            }
        });
    }

}
