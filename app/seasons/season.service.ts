import {Injectable} from "@angular/core";
import {Http} from "@angular/http";
import {CatalogService} from "../catalog.service";
import {Season} from "./season";

@Injectable()
export class SeasonService extends CatalogService<Season> {

  showId: number;

  constructor(http: Http) {
    super(http, 'shows/{showId}/seasons');
  }

  getParams(): Map<string, string> {
    let params = super.getParams();
    params.set('showId', this.showId.toString());

    return params;
  }
}
