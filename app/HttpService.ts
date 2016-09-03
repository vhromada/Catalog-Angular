import "rxjs/add/operator/toPromise";
import {Http, Headers} from "@angular/http";

export class HttpService {

  private headers = new Headers({'Content-Type': 'application/json'});
  private catalogUrl = 'http://localhost:8100';

  constructor(private http: Http) {
  }

  getData(...urlParts: string[]): Promise<any> {
    return this.http.get(this.getUrl(urlParts)).toPromise().then(response => response.json());
  }

  postData(data: any, ...urlParts: string[]): Promise<void> {
    return this.http.post(this.getUrl(urlParts), JSON.stringify(data), {headers: this.headers}).toPromise().then(() => null);
  }

  post(...urlParts: string[]): Promise<void> {
    return this.http.post(this.getUrl(urlParts), {headers: this.headers}).toPromise().then(() => null);
  }

  private getUrl(urlParts: string[]) {
    let url = this.catalogUrl;
    urlParts.forEach(urlPart => {
      url += '/' + urlPart;
    });

    return url;
  }

}