import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {MusicService} from './music.service';

@Component({
    selector: 'music-navigation',
    template: ''
})
export class MusicNavigationComponent implements OnInit {

    constructor(private musicService: MusicService,
                private router: Router,
                private route: ActivatedRoute) {
    }

    ngOnInit(): void {
        const returnUrl = '/music/list';

        this.route.params.forEach((params: Params) => {
            let action = params['action'];
            switch (action) {
                case 'new':
                    this.musicService.newData().then(response => this.router.navigate([returnUrl]));
                    break;
                case 'update':
                    this.musicService.updatePositions().then(response => this.router.navigate([returnUrl]));
                    break;
            }
        });
    }

}
