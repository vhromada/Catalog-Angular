import {Injectable} from "@angular/core";
import {Http} from "@angular/http";
import {Genre} from "./genre";
import {CatalogService} from "../catalog.service";

@Injectable()
export class GenreService extends CatalogService<Genre> {

  constructor(http: Http) {
    super(http, 'genres');
  }

}
