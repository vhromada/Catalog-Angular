import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {Genre} from './genre';
import {GenreService} from './genre.service';

@Component({
    selector: 'genre-list',
    templateUrl: './genre.list.component.html'
})
export class GenreListComponent implements OnInit {

    genres: Genre[];

    constructor(private genreService: GenreService,
                private router: Router) {
    }

    ngOnInit(): void {
        this.updateGenres();
    }

    update(genre: Genre): void {
        this.router.navigate(['/genres/edit', genre.id]);
    }

    duplicate(genre: Genre): void {
        this.genreService.duplicate(genre).then(response => this.updateGenres());
    }

    remove(genre: Genre): void {
        this.genreService.remove(genre).then(response => this.updateGenres());
    }

    moveUp(genre: Genre): void {
        this.genreService.moveUp(genre).then(response => this.updateGenres());
    }

    moveDown(genre: Genre): void {
        this.genreService.moveDown(genre).then(response => this.updateGenres());
    }

    private updateGenres(): void {
        this.genreService.list().then(genres => this.genres = genres);
    }

}
