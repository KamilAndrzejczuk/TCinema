import { Movie } from "./movie";
import { Room } from "./room";

export class Seance {

    dates: [Date];
    movie: Movie;
    room: Room;
    seats: [];
    constructor(d, m, r, s) {
        this.dates = d;
        this.movie = m;
        this.room = r;
        this.seats = s;
    }
}