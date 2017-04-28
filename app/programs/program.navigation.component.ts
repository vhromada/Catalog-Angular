import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {ProgramService} from './program.service';

@Component({
    selector: 'program-navigation',
    template: ''
})
export class ProgramNavigationComponent implements OnInit {

    constructor(private programService: ProgramService,
                private router: Router,
                private route: ActivatedRoute) {
    }

    ngOnInit(): void {
        const returnUrl = '/programs/list';

        this.route.params.forEach((params: Params) => {
            let action = params['action'];
            switch (action) {
                case 'new':
                    this.programService.newData().then(response => this.router.navigate([returnUrl]));
                    break;
                case 'update':
                    this.programService.updatePositions().then(response => this.router.navigate([returnUrl]));
                    break;
            }
        });
    }

}
