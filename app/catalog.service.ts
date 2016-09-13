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
    return this.get('list');
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

  get(urlPart: string): Promise<any> {
    return this.http.get(this.getUrl(urlPart)).toPromise().then(response => response.json());
  }

  postData(data: any, urlPart: string): Promise<void> {
    return this.http.post(this.getUrl(urlPart), JSON.stringify(data), {headers: this.headers}).toPromise().then(() => null);
  }

  post(urlPart: string): Promise<void> {
    return this.http.post(this.getUrl(urlPart), {headers: this.headers}).toPromise().then(() => null);
  }

  getParams(): Map<string, string> {
    return new Map<string, string>();
  }

  private getUrl(urlPart: string) {
    let url = this.catalogUrl + '/' + this.baseUrl + '/' + urlPart;
    this.getParams().forEach((value, key) => url = url.replace('{' + key + '}', value));

    return url;
  }

}
