import {Component, OnInit} from "@angular/core";
import {Router} from "@angular/router";
import {Music} from "./music";
import {MusicService} from "./music.service";
import {SongService} from "../songs/song.service";
import {TimeService} from "../time.service";

@Component({
  selector: 'music-list',
  templateUrl: 'app/music/music.list.component.html'
})
export class MusicListComponent implements OnInit {

  music: Music[];
  mediaCount: number;
  totalLength: string;
  songsCount: number;

  constructor(private musicService: MusicService,
              private songService: SongService,
              private timeService: TimeService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.updateData();
  }

  update(music: Music): void {
    this.router.navigate(['/music/edit', music.id]);
  }

  duplicate(music: Music): void {
    this.musicService.duplicate(music).then(() => this.updateData());
  }

  remove(music: Music): void {
    this.musicService.remove(music).then(() => this.updateData());
  }

  moveUp(music: Music): void {
    this.musicService.moveUp(music).then(() => this.updateData());
  }

  moveDown(music: Music): void {
    this.musicService.moveDown(music).then(() => this.updateData());
  }

  private updateData(): void {
    this.musicService.list().then(music => {
      music.forEach(item => {
        this.songService.musicId = item.id;
        this.songService.list().then(songs => {
          item.songsCount = songs.length;
          let totalLength = 0;
          songs.forEach(song => totalLength += song.length);
          this.timeService.time(totalLength).then(time => item.totalLength = time);
        })
      });
      this.music = music;
    });
    this.musicService.totalMedia().then(mediaCount => this.mediaCount = mediaCount);
    this.musicService.totalLength().then(totalLength => this.totalLength = totalLength);
    this.musicService.songsCount().then(songsCount => this.songsCount = songsCount);
  }

}
