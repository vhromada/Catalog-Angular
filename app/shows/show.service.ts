import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import {CatalogService} from '../common/catalog.service';
import {Show} from './show';

@Injectable()
export class ShowService extends CatalogService<Show> {

    constructor(http: Http) {
        super(http, 'shows');
    }

    totalLength(): Promise<number> {
        return this.get('totalLength');
    }

    seasonsCount(): Promise<number> {
        return this.get('seasonsCount');
    }

    episodesCount(): Promise<number> {
        return this.get('episodesCount');
    }

}
