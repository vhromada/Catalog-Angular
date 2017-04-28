import {Component, Input, OnInit} from '@angular/core';
import {Movie} from './movie';

@Component({
    selector: 'movie-subtitles',
    template: '{{data}}'
})
export class MovieSubtitlesComponent implements OnInit {

    @Input()
    movie: Movie;
    data: string;

    ngOnInit(): void {
        if (this.movie) {
            this.data = Movie.getSubtitles(this.movie);
        }
    }

}
