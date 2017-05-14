import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {Movie} from './movie';
import {MovieService} from './movie.service';
import {Time} from "../common/time";

@Component({
    selector: 'movie-list',
    templateUrl: './movie.list.component.html'
})
export class MovieListComponent implements OnInit {

    movies: Movie[];
    totalLength: string;
    mediaCount: number;

    constructor(private movieService: MovieService,
                private router: Router) {
    }

    ngOnInit(): void {
        this.updateMovies();
    }

    update(movie: Movie): void {
        this.router.navigate(['/movies/edit', movie.id]);
    }

    duplicate(movie: Movie): void {
        this.movieService.duplicate(movie).then(response => this.updateMovies());
    }

    remove(movie: Movie): void {
        this.movieService.remove(movie).then(response => this.updateMovies());
    }

    moveUp(movie: Movie): void {
        this.movieService.moveUp(movie).then(response => this.updateMovies());
    }

    moveDown(movie: Movie): void {
        this.movieService.moveDown(movie).then(response => this.updateMovies());
    }

    private updateMovies(): void {
        this.movieService.list().then(movies => {
            let mediaCount = 0;
            let totalLength = 0;
            movies.forEach(movie => {
                totalLength += Movie.getTotalLength(movie);
                mediaCount += movie.media.length;
            });
            this.movies = movies;
            this.totalLength = Time.of(totalLength).getFormattedValue();
            this.mediaCount = mediaCount;
        });
    }

}
