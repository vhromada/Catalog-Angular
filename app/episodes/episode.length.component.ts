import {Component, Input, OnInit} from '@angular/core';
import {Episode} from './episode';
import {Time} from "../common/time";

@Component({
    selector: 'episode-length',
    template: '{{data}}'
})
export class EpisodeLengthComponent implements OnInit {

    @Input()
    episode: Episode;
    data: string;

    ngOnInit(): void {
        if (this.episode) {
            this.data = Time.of(this.episode.length).getFormattedValue();
        }
    }

}
