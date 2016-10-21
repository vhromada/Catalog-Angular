import {Component, OnInit} from "@angular/core";
import {Router, ActivatedRoute, Params} from "@angular/router";
import {Song} from "./song";
import {SongService} from "./song.service";

@Component({
  selector: 'song-list',
  templateUrl: 'app/songs/song.list.component.html'
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
    this.songService.duplicate(song).then(() => this.updateData());
  }

  remove(song: Song): void {
    this.songService.musicId = this.musicId;
    this.songService.remove(song).then(() => this.updateData());
  }

  moveUp(song: Song): void {
    this.songService.musicId = this.musicId;
    this.songService.moveUp(song).then(() => this.updateData());
  }

  moveDown(song: Song): void {
    this.songService.musicId = this.musicId;
    this.songService.moveDown(song).then(() => this.updateData());
  }

  private updateData(): void {
    this.songService.musicId = this.musicId;
    this.songService.list().then(songs => this.songs = songs);
  }

}
