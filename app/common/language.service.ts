import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import {CatalogService} from './catalog.service';

@Injectable()
export class LanguageService extends CatalogService<string> {

    constructor(http: Http) {
        super(http, 'languages');
    }

    subtitles(): Promise<string[]> {
        return this.get('subtitles');
    }

}
