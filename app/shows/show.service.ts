import {Injectable} from "@angular/core";
import {Http} from "@angular/http";
import {Show} from "./show";
import {CatalogService} from "../catalog.service";

@Injectable()
export class ShowService extends CatalogService<Show> {

  constructor(http: Http) {
    super(http, 'shows');
  }

  totalLength(): Promise<any> {
    return this.get('totalLength');
  }

  seasonsCount(): Promise<any> {
    return this.get('seasonsCount');
  }

  episodesCount(): Promise<any> {
    return this.get('episodesCount');
  }

}
