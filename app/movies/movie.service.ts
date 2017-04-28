import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import {CatalogService} from '../common/catalog.service';
import {Movie} from './movie';

@Injectable()
export class MovieService extends CatalogService<Movie> {

    constructor(http: Http) {
        super(http, 'movies');
    }

}
