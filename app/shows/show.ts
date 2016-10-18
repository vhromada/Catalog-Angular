import {Genre} from "../genres/genre";

export class Show {

  id: number;
  czechName: string;
  originalName: string;
  csfd: string;
  imdbCode: number;
  wikiEn: string;
  wikiCz: string;
  picture: string;
  note: string;
  position: number;
  genres: Genre[];
  seasonsCount: number;
  episodesCount: number;
  totalLength: string;

  public static getGenres(show: Show): string {
    return show.genres.map(genre => genre.name).join(', ');
  }

}
