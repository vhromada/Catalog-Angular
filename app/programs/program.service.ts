import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import {CatalogService} from '../common/catalog.service';
import {Program} from './program';

@Injectable()
export class ProgramService extends CatalogService<Program> {

    constructor(http: Http) {
        super(http, 'programs');
    }

    totalMedia(): Promise<number> {
        return this.get('totalMedia');
    }

}
