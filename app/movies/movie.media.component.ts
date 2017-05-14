import {Component, Input, OnInit} from "@angular/core";
import {Movie} from "./movie";

@Component({
    selector: 'movie-media',
    template: '{{data}}'
})
export class MovieMediaComponent implements OnInit {

    @Input()
    movie: Movie;
    data: string;

    ngOnInit(): void {
        if (this.movie) {
            this.data = Movie.getMedia(this.movie);
        }
    }

}
