import {Injectable} from "@angular/core";
import {Http} from "@angular/http";
import {Game} from "./game";
import {CatalogService} from "../catalog.service";

@Injectable()
export class GameService extends CatalogService<Game> {

  constructor(http: Http) {
    super(http, 'games');
  }

  totalMedia(): Promise<any> {
    return this.get('totalMedia');
  }

}
