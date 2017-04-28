import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import {CatalogService} from '../common/catalog.service';
import {Song} from './song';

@Injectable()
export class SongService extends CatalogService<Song> {

    musicId: number;

    constructor(http: Http) {
        super(http, 'music/{musicId}/songs');
    }

    getParams(): Map<string, string> {
        let params = super.getParams();
        params.set('musicId', this.musicId.toString());

        return params;
    }

}
