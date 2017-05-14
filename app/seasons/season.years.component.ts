import {Component, Input, OnInit} from '@angular/core';
import {Season} from "./season";

@Component({
    selector: 'season-years',
    template: '{{data}}'
})
export class SeasonYearsComponent implements OnInit {

    @Input()
    season: Season;
    data: string;

    ngOnInit(): void {
        if (this.season) {
            this.data = this.season.startYear === this.season.endYear ? this.season.startYear.toString() : this.season.startYear + ' - ' + this.season.endYear;
        }
    }

}
