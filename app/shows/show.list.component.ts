import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {TimeService} from '../common/time.service';
import {EpisodeService} from '../episodes/episode.service';
import {SeasonService} from '../seasons/season.service';
import {Show, ShowData} from './show';
import {ShowService} from './show.service';

@Component({
    selector: 'show-list',
    templateUrl: './show.list.component.html'
})
export class ShowListComponent implements OnInit {

    shows: ShowData[];
    seasonsCount: number;
    episodesCount: number;
    totalLength: string;

    constructor(private showService: ShowService,
                private seasonService: SeasonService,
                private episodeService: EpisodeService,
                private timeService: TimeService,
                private router: Router) {
    }

    ngOnInit(): void {
        this.updateShows();
    }

    update(show: Show): void {
        this.router.navigate(['/shows/edit', show.id]);
    }

    duplicate(show: Show): void {
        this.showService.duplicate(show).then(response => this.updateShows());
    }

    remove(show: Show): void {
        this.showService.remove(show).then(response => this.updateShows());
    }

    moveUp(show: Show): void {
        this.showService.moveUp(show).then(response => this.updateShows());
    }

    moveDown(show: Show): void {
        this.showService.moveDown(show).then(response => this.updateShows());
    }

    private updateShows(): void {
        this.showService.list().then(shows => {
            this.shows = [];
            shows.forEach(show => {
                const data = new ShowData();
                data.show = show;
                this.seasonService.showId = show.id;
                this.seasonService.list().then(seasons => {
                    data.episodesCount = 0;
                    let totalLength = 0;
                    data.seasonsCount = seasons.length;
                    seasons.forEach(season => {
                        this.episodeService.showId = show.id;
                        this.episodeService.seasonId = season.id;
                        this.episodeService.list().then(episodes => {
                            data.episodesCount += episodes.length;
                            episodes.forEach(episode => totalLength += episode.length);
                            this.timeService.time(totalLength).then(time => data.totalLength = time);
                        });
                    });
                });
                this.shows.push(data);
            });
        });
        this.showService.seasonsCount().then(seasonsCount => this.seasonsCount = seasonsCount);
        this.showService.episodesCount().then(episodesCount => this.episodesCount = episodesCount);
        this.showService.totalLength().then(totalLength => {
            this.timeService.time(totalLength).then(time => this.totalLength = time);
        });
    }

}
