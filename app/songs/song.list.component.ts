import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {Song} from './song';
import {SongService} from './song.service';

@Component({
    selector: 'song-list',
    templateUrl: './song.list.component.html'
})
export class SongListComponent implements OnInit {

    musicId: number;
    songs: Song[];

    constructor(private router: Router,
                private route: ActivatedRoute,
                private songService: SongService) {
    }

    ngOnInit(): void {
        this.route.params.forEach((params: Params) => {
            this.musicId = params['musicId'];
            this.updateData();
        });
    }

    update(song: Song): void {
        this.router.navigate(['/music/' + this.musicId + '/songs/edit/', song.id]);
    }

    duplicate(song: Song): void {
        this.songService.musicId = this.musicId;
        this.songService.duplicate(song).then(response => this.updateData());
    }

    remove(song: Song): void {
        this.songService.musicId = this.musicId;
        this.songService.remove(song).then(response => this.updateData());
    }

    moveUp(song: Song): void {
        this.songService.musicId = this.musicId;
        this.songService.moveUp(song).then(response => this.updateData());
    }

    moveDown(song: Song): void {
        this.songService.musicId = this.musicId;
        this.songService.moveDown(song).then(response => this.updateData());
    }

    private updateData(): void {
        this.songService.musicId = this.musicId;
        this.songService.list().then(songs => this.songs = songs);
    }

}
