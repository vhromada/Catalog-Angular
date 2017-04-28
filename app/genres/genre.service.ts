import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import {CatalogService} from '../common/catalog.service';
import {Genre} from './genre';

@Injectable()
export class GenreService extends CatalogService<Genre> {

    constructor(http: Http) {
        super(http, 'genres');
    }

}
