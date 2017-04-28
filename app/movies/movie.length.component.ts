import {Component, Input, OnInit} from '@angular/core';
import {TimeService} from '../common/time.service';
import {Movie} from './movie';

@Component({
    selector: 'movie-length',
    template: '{{data}}'
})
export class MovieLengthComponent implements OnInit {

    @Input()
    movie: Movie;
    data: string;

    constructor(private timeService: TimeService) {
    }

    ngOnInit(): void {
        if (this.movie) {
            this.timeService.time(Movie.getTotalLength(this.movie)).then(time => this.data = time);
        }
    }

}
