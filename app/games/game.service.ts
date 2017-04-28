import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import {CatalogService} from '../common/catalog.service';
import {Game} from './game';

@Injectable()
export class GameService extends CatalogService<Game> {

    constructor(http: Http) {
        super(http, 'games');
    }

    totalMedia(): Promise<number> {
        return this.get('totalMedia');
    }

}
