import {Component, Input, OnInit} from '@angular/core';
import {Song} from './song';
import {Time} from "../common/time";

@Component({
    selector: 'song-length',
    template: '{{data}}'
})
export class SongLengthComponent implements OnInit {

    @Input()
    song: Song;
    data: string;

    ngOnInit(): void {
        if (this.song) {
            this.data = Time.of(this.song.length).getFormattedValue();
        }
    }

}
