import {Genre} from '../genres/genre';
import {Time} from "../common/time";

export class Movie {

    id: number;
    czechName: string;
    originalName: string;
    year: number;
    language: string;
    subtitles: string[];
    media: Medium[];
    csfd: string;
    imdbCode: number;
    wikiEn: string;
    wikiCz: string;
    picture: string;
    note: string;
    position: number;
    genres: Genre[];

    public static getSubtitles(movie: Movie): string {
        return movie.subtitles.join(', ');
    }

    public static getMedia(movie: Movie): string {
        return movie.media.map(medium => Time.of(medium.length).getFormattedValue()).join(', ');
    }

    public static getTotalLength(movie: Movie): number {
        return movie.media.map(medium => medium.length).reduce((previous, current) => previous + current, 0);
    }

    public static getGenres(movie: Movie): string {
        return movie.genres.map(genre => genre.name).join(', ');
    }
}

export class Medium {

    id: number;
    length: number;
    number: number;

}
