import {Injectable} from "@angular/core";
import {Http} from "@angular/http";
import {Movie} from "./movie";
import {CatalogService} from "../catalog.service";

@Injectable()
export class MovieService extends CatalogService<Movie> {

  constructor(http: Http) {
    super(http, 'movies');
  }

}
