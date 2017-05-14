import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {SongService} from '../songs/song.service';
import {Music, MusicData} from './music';
import {MusicService} from './music.service';
import {Time} from "../common/time";

@Component({
    selector: 'music-list',
    templateUrl: './music.list.component.html'
})
export class MusicListComponent implements OnInit {

    music: MusicData[];
    mediaCount: number;
    totalLength: string;
    songsCount: number;

    constructor(private musicService: MusicService,
                private songService: SongService,
                private router: Router) {
    }

    ngOnInit(): void {
        this.updateData();
    }

    update(music: Music): void {
        this.router.navigate(['/music/edit', music.id]);
    }

    duplicate(music: Music): void {
        this.musicService.duplicate(music).then(response => this.updateData());
    }

    remove(music: Music): void {
        this.musicService.remove(music).then(response => this.updateData());
    }

    moveUp(music: Music): void {
        this.musicService.moveUp(music).then(response => this.updateData());
    }

    moveDown(music: Music): void {
        this.musicService.moveDown(music).then(response => this.updateData());
    }

    private updateData(): void {
        this.musicService.list().then(music => {
            this.music = [];
            music.forEach(item => {
                const data = new MusicData();
                data.music = item;
                this.songService.musicId = item.id;
                this.songService.list().then(songs => {
                    data.songsCount = songs.length;
                    let totalLength = 0;
                    songs.forEach(song => totalLength += song.length);
                    data.totalLength = Time.of(totalLength).getFormattedValue();
                });
                this.music.push(data);
            });
        });
        this.musicService.totalMedia().then(mediaCount => this.mediaCount = mediaCount);
        this.musicService.totalLength().then(totalLength => {
            this.totalLength = Time.of(totalLength).getFormattedValue();
        });
        this.musicService.songsCount().then(songsCount => this.songsCount = songsCount);
    }

}
