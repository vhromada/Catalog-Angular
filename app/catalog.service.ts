import "rxjs/add/operator/toPromise";
import {Http, Headers} from "@angular/http";

export class CatalogService<T> {

  private headers = new Headers({'Content-Type': 'application/json'});
  private catalogUrl = 'http://localhost:8100';

  constructor(private http: Http,
              private baseUrl: string) {
  }

  new(): Promise<any> {
    return this.post('new');
  }

  list(): Promise<T[]> {
    return this.get();
  }

  item(id: number): Promise<T> {
    return this.get(id.toString());
  }

  add(data: T): Promise<any> {
    return this.postData(data, 'add')
  }

  update(data: T): Promise<any> {
    return this.postData(data, 'update')
  }

  remove(data: T): Promise<any> {
    return this.postData(data, 'remove')
  }

  duplicate(data: T): Promise<any> {
    return this.postData(data, 'duplicate')
  }

  moveUp(data: T): Promise<any> {
    return this.postData(data, 'moveUp')
  }

  moveDown(data: T): Promise<any> {
    return this.postData(data, 'moveDown')
  }

  updatePositions(): Promise<any> {
    return this.post('updatePositions')
  }

  get(...urlParts: string[]): Promise<any> {
    return this.http.get(this.getUrl(urlParts)).toPromise().then(response => response.json());
  }

  postData(data: any, ...urlParts: string[]): Promise<void> {
    return this.http.post(this.getUrl(urlParts), JSON.stringify(data), {headers: this.headers}).toPromise().then(() => null);
  }

  post(...urlParts: string[]): Promise<void> {
    return this.http.post(this.getUrl(urlParts), {headers: this.headers}).toPromise().then(() => null);
  }

  private getUrl(urlParts: string[]) {
    let url = this.catalogUrl + '/' + this.baseUrl;
    urlParts.forEach(urlPart => {
      url += '/' + urlPart;
    });

    return url;
  }

}
