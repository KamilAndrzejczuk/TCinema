import { Movie } from './../classes/movie';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Room } from '../classes/room';
import { Seance } from '../classes/seance';
import { MovieService } from './movie.service';
import { RoomService } from './room.service';

@Injectable({
  providedIn: 'root'
})
export class DBConnectionService {


  baseURL = `http://localhost:8080`;
  constructor(private movieService: MovieService, private roomService: RoomService, private http: HttpClient) { }

  movies: Movie[] = [];
  rooms: Room[] = [];
  seances: Seance[] = [];

  //seances

  ngOnInit() {
    this.roomService.getRooms()
      .subscribe((observer: any) => {
        for (let room of observer.rooms) {
          this.rooms.push(new Room(room._id, room.number, room.rows, room.columns));

        }

      });
    this.movieService.getMovies()
      .subscribe((observer: any) => {
        for (let movie of observer.movies) {
          this.movies.push(new Movie(movie._id, movie.title, movie.productionYear, movie.director));
        }
      })
  }


  addSeance(newSeanceRoom: String, newSeanceMovie: String, newSeanceDates: Date[]) {
    return this.http.post(`${this.baseURL}/seance/add`, {
      room: newSeanceRoom,
      movie: newSeanceMovie,
      dates: newSeanceDates
    });
  }

  deleteSeances(seances: Seance[]) {
    let seanceIds = seances.map(el => el.id);
    return this.http.request('delete', `${this.baseURL}/seance/remove`, {
      body: {
        seances: seanceIds
      }
    })
  }


  getSeances() {
    return this.http.get(`${this.baseURL}/seance/all`);
  }

  //seats
  getSeatsForSeance(seanceSeats) {
    return this.http.post(`${this.baseURL}/seats/getseats`, { seats: seanceSeats });
  }

  reserveSeat(seats, personInfo) {
    return this.http.post(`${this.baseURL}/seats/reserve`, { seats: seats, personInfo: personInfo });
  }

  //movies


  newMovieTitle: String;
  newMovieProductionYear: Date;
  newMovieDirector: String;


  getMovies() {
    return this.http.get(`${this.baseURL}/movie/all`);
  }

  addMovie(newMovieTitle, newMovieProductionYear, newMovieDirector) {
 
    return this.http.post(`${this.baseURL}/movie/add`, {
      title: newMovieTitle,
      productionYear: newMovieProductionYear,
      director: newMovieDirector
    });
  }

  deleteMovie(movieId) {
    return this.http.request('delete', `${this.baseURL}/movie/remove`, { body: { id: movieId } });
  }

  //rooms
  newRoomColumns: Number;
  newRoomRows: Number;


  addRoom(newRoomNumber, newRoomRows, newRoomColumns) {
    // this.rooms.push(room);
    return this.http.post(`${this.baseURL}/room/add`, {
      number: newRoomNumber,
      columns: newRoomColumns,
      rows: newRoomRows
    });
  }

  getRooms() {
    return this.http.get(`${this.baseURL}/room/getRooms`)

  }

  deleteRoom(room: Room) {
    return this.http.request('delete',`${this.baseURL}/room/remove`, {body:{number: room.number}});
  }
}
