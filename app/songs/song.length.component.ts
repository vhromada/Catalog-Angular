import {Component, Input, OnInit} from "@angular/core";
import {Song} from "./song";
import {TimeService} from "../time.service";

@Component({
  selector: 'song-length',
  template: '{{data}}'
})
export class SongLengthComponent implements OnInit {

  @Input()
  song: Song;
  data: string;

  constructor(private timeService: TimeService) {
  }

  ngOnInit(): void {
    if (this.song) {
      this.timeService.time(this.song.length).then(time => this.data = time)
    }
  }

}