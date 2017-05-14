import {Component, Input, OnInit} from '@angular/core';
import {Season} from "./season";

@Component({
    selector: 'season-subtitles',
    template: '{{data}}'
})
export class SeasonSubtitlesComponent implements OnInit {

    @Input()
    season: Season;
    data: string;

    ngOnInit(): void {
        if (this.season) {
            this.data = Season.getSubtitles(this.season);
        }
    }

}
