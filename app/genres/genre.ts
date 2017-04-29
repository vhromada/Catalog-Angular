export class Genre {

    id: number;
    name: string;
    position: number;

    static equals(genre: Genre, value: Genre) {
        return genre.id === value.id && genre.name === value.name && genre.position === value.position;
    }

}
