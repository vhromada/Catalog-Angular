import {Headers, Http, RequestMethod} from '@angular/http';
import 'rxjs/add/operator/toPromise';

export class CatalogService<T> {

    private headers = new Headers({'Content-Type': 'application/json'});
    private catalogUrl = 'http://localhost:8100/catalog';

    constructor(private http: Http,
                private baseUrl: string) {
    }

    newData(): Promise<any> {
        return this.post('new');
    }

    list(): Promise<T[]> {
        return this.get('list');
    }

    item(id: number): Promise<T> {
        return this.get(id.toString());
    }

    add(data: T): Promise<any> {
        return this.put(data, 'add');
    }

    update(data: T): Promise<any> {
        return this.postData(data, 'update');
    }

    remove(data: T): Promise<any> {
        return this.deleteData(data, 'remove');
    }

    duplicate(data: T): Promise<any> {
        return this.postData(data, 'duplicate');
    }

    moveUp(data: T): Promise<any> {
        return this.postData(data, 'moveUp');
    }

    moveDown(data: T): Promise<any> {
        return this.postData(data, 'moveDown');
    }

    updatePositions(): Promise<any> {
        return this.post('updatePositions');
    }

    get(urlPart: string): Promise<any> {
        return this.http.get(this.getUrl(urlPart)).toPromise()
            .then(CatalogService.processResponse)
            .catch(CatalogService.handleError);
    }

    postData(data: any, urlPart: string): Promise<any> {
        return this.http.post(this.getUrl(urlPart), JSON.stringify(data), {headers: this.headers}).toPromise()
            .then(CatalogService.processResponse)
            .catch(CatalogService.handleError);
    }

    post(urlPart: string): Promise<any> {
        return this.http.post(this.getUrl(urlPart), {headers: this.headers}).toPromise()
            .then(CatalogService.processResponse)
            .catch(CatalogService.handleError);
    }

    put(data: any, urlPart: string): Promise<any> {
        return this.http.put(this.getUrl(urlPart), JSON.stringify(data), {headers: this.headers}).toPromise()
            .then(CatalogService.processResponse)
            .catch(CatalogService.handleError);
    }

    deleteData(data: any, urlPart: string): Promise<any> {
        const options = {
            body: JSON.stringify(data),
            method: RequestMethod.Delete,
            headers: this.headers
        };

        return this.http.delete(this.getUrl(urlPart), options).toPromise()
            .then(CatalogService.processResponse)
            .catch(CatalogService.handleError);
    }

    getParams(): Map<string, string> {
        return new Map<string, string>();
    }

    private getUrl(urlPart: string): string {
        let url = this.catalogUrl + '/' + this.baseUrl + '/' + urlPart;
        this.getParams().forEach((value, key) => url = url.replace('{' + key + '}', value));

        return url;
    }

    private static processResponse(response: any): Promise<any> {
        const result = response.json();

        if (result.status === 'OK') {
            return Promise.resolve(result.data);
        } else {
            console.error('An error occurred', result.events);

            return Promise.reject(result.events);
        }
    }

    private static handleError(error: any): Promise<any> {
        console.error('An error occurred', error);

        return Promise.reject(error.message || error);
    }

}
