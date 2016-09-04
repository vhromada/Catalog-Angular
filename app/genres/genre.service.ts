import {Injectable} from "@angular/core";
import {CatalogService} from "../catalog.service";
import {Http} from "@angular/http";
import {Genre} from "./genre";

@Injectable()
export class GenreService extends CatalogService<Genre> {

  constructor(http: Http) {
    super(http, 'genres');
  }

}
