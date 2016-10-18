import {Injectable} from "@angular/core";
import {Http} from "@angular/http";
import {CatalogService} from "../catalog.service";
import {Episode} from "./episode";

@Injectable()
export class EpisodeService extends CatalogService<Episode> {

  showId: number;
  seasonId: number;

  constructor(http: Http) {
    super(http, 'shows/{showId}/seasons/{seasonId}/episodes');
  }

  getParams(): Map<string, string> {
    let params = super.getParams();
    params.set('showId', this.showId.toString());
    params.set('seasonId', this.seasonId.toString());

    return params;
  }
}
