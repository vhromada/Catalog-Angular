import {Injectable} from "@angular/core";
import {Http} from "@angular/http";
import {CatalogService} from "./catalog.service";

@Injectable()
export class TimeService extends CatalogService<any> {

  constructor(http: Http) {
    super(http, 'time');
  }

  time(value: number): Promise<string> {
    return this.get(value.toString())
  }

}
