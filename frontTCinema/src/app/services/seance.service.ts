import { HttpClient } from '@angular/common/http';
import { Seat } from './../classes/seat';
import { Room } from './../classes/room';
import { RoomService } from './room.service';
import { Seance } from './../classes/seance';
import { Injectable, OnInit } from '@angular/core';
import { Movie } from '../classes/movie';
import { MovieService } from './movie.service';

@Injectable({
  providedIn: 'root'
})
export class SeanceService implements OnInit {

  baseURL: String = `http://localhost:8080/seance`

  movies: Movie[];
  rooms: Room[];
  seances: Seance[] = [];

  constructor(private movieService: MovieService, private roomService: RoomService, private http: HttpClient) { }

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
    return this.http.post(`${this.baseURL}/add`, {
      room: newSeanceRoom,
      movie: newSeanceMovie,
      dates: newSeanceDates
    });
  }

  deleteSeances(seances: Seance[]) {
    let seanceIds = seances.map(el => el.id);
    return this.http.request('delete', `${this.baseURL}/remove`, {
      body: {
        seances: seanceIds
      }
    })
  }


  getSeances() {
    return this.http.get(`${this.baseURL}/all`);
  }
}
