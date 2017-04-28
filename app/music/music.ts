export class Music {

    id: number;
    name: string;
    wikiEn: string;
    wikiCz: string;
    mediaCount: number;
    note: string;
    position: number;

}

export class MusicData {

    music: Music;
    songsCount: number;
    totalLength: string;

}
