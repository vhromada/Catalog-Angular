import {Injectable} from "@angular/core";
import {CatalogService} from "../catalog.service";
import {Http} from "@angular/http";

@Injectable()
export class GenreService extends CatalogService {

  constructor(http: Http) {
    super(http, 'genres');
  }

}
