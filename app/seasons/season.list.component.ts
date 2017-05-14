import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {Season, SeasonData} from './season';
import {SeasonService} from './season.service';
import {EpisodeService} from "../episodes/episode.service";
import {Time} from "../common/time";

@Component({
    selector: 'season-list',
    templateUrl: './season.list.component.html'
})
export class SeasonListComponent implements OnInit {

    showId: number;
    seasons: SeasonData[];

    constructor(private router: Router,
                private route: ActivatedRoute,
                private seasonService: SeasonService,
                private episodeService: EpisodeService) {
    }

    ngOnInit(): void {
        this.route.params.forEach((params: Params) => {
            this.showId = params['showId'];
            this.updateData();
        });
    }

    update(season: Season): void {
        this.router.navigate(['/shows/' + this.showId + '/seasons/edit/', season.id]);
    }

    duplicate(season: Season): void {
        this.seasonService.showId = this.showId;
        this.seasonService.duplicate(season).then(response => this.updateData());
    }

    remove(season: Season): void {
        this.seasonService.showId = this.showId;
        this.seasonService.remove(season).then(response => this.updateData());
    }

    moveUp(season: Season): void {
        this.seasonService.showId = this.showId;
        this.seasonService.moveUp(season).then(response => this.updateData());
    }

    moveDown(season: Season): void {
        this.seasonService.showId = this.showId;
        this.seasonService.moveDown(season).then(response => this.updateData());
    }

    private updateData(): void {
        this.seasonService.showId = this.showId;
        this.seasons = [];
        this.seasonService.list().then(seasons => {
            seasons.forEach(season => {
                const data = new SeasonData();
                data.season = season;
                let totalLength = 0;
                this.episodeService.showId = this.showId;
                this.episodeService.seasonId = season.id;
                this.episodeService.list().then(episodes => {
                    data.episodesCount = episodes.length;
                    episodes.forEach(eposide => totalLength += eposide.length);
                    data.totalLength = Time.of(totalLength).getFormattedValue();
                });
                this.seasons.push(data);
            });
        });
    }

}
