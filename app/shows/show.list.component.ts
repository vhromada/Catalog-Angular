import {Component, OnInit} from "@angular/core";
import {Router} from "@angular/router";
import {Show} from "./show";
import {ShowService} from "./show.service";
import {SeasonService} from "../seasons/season.service";
import {EpisodeService} from "../episodes/episode.service";
import {TimeService} from "../time.service";

@Component({
  selector: 'show-list',
  templateUrl: 'app/shows/show.list.component.html'
})
export class ShowListComponent implements OnInit {

  shows: Show[];
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
    this.showService.duplicate(show).then(() => this.updateShows());
  }

  remove(show: Show): void {
    this.showService.remove(show).then(() => this.updateShows());
  }

  moveUp(show: Show): void {
    this.showService.moveUp(show).then(() => this.updateShows());
  }

  moveDown(show: Show): void {
    this.showService.moveDown(show).then(() => this.updateShows());
  }

  private updateShows(): void {
    this.showService.list().then(shows => {
      shows.forEach(show => {
        this.seasonService.showId = show.id;
        this.seasonService.list().then(seasons => {
          show.episodesCount = 0;
          let totalLength = 0;
          show.seasonsCount = seasons.length;
          seasons.forEach(season => {
            this.episodeService.showId = show.id;
            this.episodeService.seasonId = season.id;
            this.episodeService.list().then(episodes => {
              show.episodesCount += episodes.length;
              episodes.forEach(episode => totalLength += episode.length);
              this.timeService.time(totalLength).then(time => show.totalLength = time);
            });
          });
        });
      });
      this.shows = shows;
    });
    this.showService.seasonsCount().then(seasonsCount => this.seasonsCount = seasonsCount);
    this.showService.episodesCount().then(episodesCount => this.episodesCount = episodesCount);
    this.showService.totalLength().then(totalLength => {
      this.timeService.time(totalLength).then(time => this.totalLength = time);
    });
  }

}
