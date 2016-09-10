import {Injectable} from "@angular/core";
import {Http} from "@angular/http";
import {Program} from "./program";
import {CatalogService} from "../catalog.service";

@Injectable()
export class ProgramService extends CatalogService<Program> {

  constructor(http: Http) {
    super(http, 'programs');
  }

  totalMedia(): Promise<any> {
    return this.get('totalMedia');
  }

}
