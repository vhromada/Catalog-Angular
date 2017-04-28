import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import {CatalogService} from '../common/catalog.service';
import {Music} from './music';

@Injectable()
export class MusicService extends CatalogService<Music> {

    constructor(http: Http) {
        super(http, 'music');
    }

    totalMedia(): Promise<number> {
        return this.get('totalMedia');
    }

    totalLength(): Promise<number> {
        return this.get('totalLength');
    }

    songsCount(): Promise<number> {
        return this.get('songsCount');
    }

}
