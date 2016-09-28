import {Injectable} from "@angular/core";
import {Http} from "@angular/http";
import {CatalogService} from "./catalog.service";

@Injectable()
export class LanguageService extends CatalogService<any> {

  constructor(http: Http) {
    super(http, 'languages');
  }

  subtitles(): Promise<any[]> {
    return this.get('subtitles');
  }

}
