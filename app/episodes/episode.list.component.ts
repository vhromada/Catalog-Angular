import {Component, OnInit} from "@angular/core";
import {ActivatedRoute, Params, Router} from "@angular/router";
import {Episode} from "./episode";
import {EpisodeService} from "./episode.service";

@Component({
    selector: 'episode-list',
    templateUrl: './episode.list.component.html'
})
export class EpisodeListComponent implements OnInit {

    showId: number;
    seasonId: number;
    episodes: Episode[];

    constructor(private router: Router,
                private route: ActivatedRoute,
                private episodeService: EpisodeService) {
    }

    ngOnInit(): void {
        this.route.params.forEach((params: Params) => {
            this.showId = params['showId'];
            this.seasonId = params['seasonId'];
            this.updateData();
        });
    }

    update(episode: Episode): void {
        this.router.navigate(['/shows/' + this.showId + '/seasons/' + this.seasonId + '/episodes/edit/', episode.id]);
    }

    duplicate(episode: Episode): void {
        this.episodeService.showId = this.showId;
        this.episodeService.seasonId = this.seasonId;
        this.episodeService.duplicate(episode).then(response => this.updateData());
    }

    remove(episode: Episode): void {
        this.episodeService.showId = this.showId;
        this.episodeService.seasonId = this.seasonId;
        this.episodeService.remove(episode).then(response => this.updateData());
    }

    moveUp(episode: Episode): void {
        this.episodeService.showId = this.showId;
        this.episodeService.seasonId = this.seasonId;
        this.episodeService.moveUp(episode).then(response => this.updateData());
    }

    moveDown(episode: Episode): void {
        this.episodeService.showId = this.showId;
        this.episodeService.seasonId = this.seasonId;
        this.episodeService.moveDown(episode).then(response => this.updateData());
    }

    private updateData(): void {
        this.episodeService.showId = this.showId;
        this.episodeService.seasonId = this.seasonId;
        this.episodeService.list().then(episodes => this.episodes = episodes);
    }

}
