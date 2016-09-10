import {Injectable} from "@angular/core";
import {Http} from "@angular/http";
import {Music} from "./music";
import {CatalogService} from "../catalog.service";

@Injectable()
export class MusicService extends CatalogService<Music> {

  constructor(http: Http) {
    super(http, 'music');
  }

  totalMedia(): Promise<any> {
    return this.get('totalMedia');
  }

  totalLength(): Promise<any> {
    return this.get('totalLength');
  }

  songsCount(): Promise<any> {
    return this.get('songsCount');
  }

}
