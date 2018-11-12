import { Movie } from "./movie";
import { Room } from "./room";

export class Seance {
    id: String;
    dates: [Date];
    movie: Movie;
    room: Room;
    seats: [];
    constructor(id,d, m, r, s) {
        this.id = id;
        this.dates = d;
        this.movie = m;
        this.room = r;
        this.seats = s;
    }
}