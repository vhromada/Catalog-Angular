export class Season {

    id: number;
    number: number;
    startYear: number;
    endYear: number;
    language: string;
    subtitles: string[];
    note: string;
    position: number;

    public static getSubtitles(season: Season): string {
        return season.subtitles.join(', ');
    }

}

export class SeasonData {

    season: Season;
    episodesCount: number;
    totalLength: string;

}
