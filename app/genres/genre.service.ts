import {Injectable} from "@angular/core";
import {Genre} from "./genre";
import {HttpService} from "../HttpService";
import {Http} from "@angular/http";

@Injectable()
export class GenreService extends HttpService {

  private genreUrl = 'genres';

  constructor(http: Http) {
    super(http);
  }

  newData(): Promise<any> {
    return this.post(this.genreUrl, 'new');
  }

  getGenres(): Promise<Genre[]> {
    return this.getData(this.genreUrl);
  }

  getGenre(id: number): Promise<Genre> {
    return this.getData(this.genreUrl, id.toString());
  }

  addGenre(genre: Genre): Promise<any> {
    return this.postData(genre, this.genreUrl, 'add')
  }

  updateGenre(genre: Genre): Promise<any> {
    return this.postData(genre, this.genreUrl, 'update')
  }

  removeGenre(genre: Genre): Promise<any> {
    return this.postData(genre, this.genreUrl, 'remove')
  }

  duplicateGenre(genre: Genre): Promise<any> {
    return this.postData(genre, this.genreUrl, 'duplicate')
  }

  moveUp(genre: Genre): Promise<any> {
    return this.postData(genre, this.genreUrl, 'moveUp')
  }

  moveDown(genre: Genre): Promise<any> {
    return this.postData(genre, this.genreUrl, 'moveDown')
  }

  updatePositions(): Promise<any> {
    return this.post(this.genreUrl, 'updatePositions')
  }

}