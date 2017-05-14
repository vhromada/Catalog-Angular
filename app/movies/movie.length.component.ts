import {Component, Input, OnInit} from '@angular/core';
import {Movie} from './movie';
import {Time} from "../common/time";

@Component({
    selector: 'movie-length',
    template: '{{data}}'
})
export class MovieLengthComponent implements OnInit {

    @Input()
    movie: Movie;
    data: string;

    ngOnInit(): void {
        if (this.movie) {
            this.data = Time.of(Movie.getTotalLength(this.movie)).getFormattedValue();
        }
    }

}
