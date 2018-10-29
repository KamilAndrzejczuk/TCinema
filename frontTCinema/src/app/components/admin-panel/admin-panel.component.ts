import { Seance } from './../../classes/seance';
import { Movie } from './../../classes/movie';
import { Component, OnInit } from '@angular/core';
import { Room } from '../../classes/room';
import { Seat } from 'src/app/classes/seat';

@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.css']
})
export class AdminPanelComponent implements OnInit {

  datepickerPage = 0;
  todayDate = new Date(Date.now()).getTime();
  daysToView: number[] = [0, 1, 2, 3, 4, 5, 6];
  hoursToView: String[] = ["10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00", "19:00", "20:00", "21:00", "22:00",];
  todaydate: number = new Date(new Date(Date.now()).setHours(10, 0, 0, 0)).getTime();
  daysToView2: Date[] = [new Date(this.todaydate), new Date(this.todaydate + (1000 * 60 * 60 * 24 * 1)), new Date(this.todaydate + (1000 * 60 * 60 * 24 * 2)), new Date(this.todaydate + (1000 * 60 * 60 * 24 * 3)), new Date(this.todaydate + (1000 * 60 * 60 * 24 * 4)), new Date(this.todaydate + (1000 * 60 * 60 * 24 * 5)), new Date(this.todaydate + (1000 * 60 * 60 * 24 * 6))];


  nextDates() {
    this.daysToView2 = this.daysToView2.map(day => {
      return new Date(day.getTime() + (1000 * 60 * 60 * 24 * 7));
    });
    this.datepickerPage++;
    console.log(this.daysToView2);

  }
  previousDates() {
    this.daysToView2 = this.daysToView2.map(day => {
      return new Date(day.getTime() - (1000 * 60 * 60 * 24 * 7));
    });
    this.datepickerPage--;
    console.log(this.daysToView2);
  }

  //room
  newRoomColumns: Number;
  newRoomRows: Number;
  rooms: Room[] = [
    new Room(1, 10, 10),
    new Room(2, 12, 10),
    new Room(3, 13, 10),
    new Room(4, 10, 8),
  ];
  newRoomNumber = this.rooms.length + 1;

  addRoom() {
    this.rooms.push(new Room(this.newRoomNumber, this.newRoomRows, this.newRoomColumns));
    this.newRoomNumber = this.newRoomNumber + 1;
  }

  deleteRoom(room){
    this.rooms.splice(this.rooms.indexOf(room),1);
  }


  //movie

  newMovieTitle: String;
  newMovieProductionYear: Date;
  newMovieDirector: String;

  movies: Movie[] = [
    new Movie("Szklana Pulapka I", 1995, "Jan Kowalski"),
    new Movie("Szklana Pulapka II", 1998, "Zbigniew Wodecki"),
    new Movie("American Pie", 1992, "Steven Hawking"),
    new Movie("XXX", 2005, "Muniek Staszczyk")
  ];

  addMovie() {
    this.movies.push(new Movie(this.newMovieTitle, this.newMovieProductionYear, this.newMovieDirector));
  }

  deleteMovie(movie){

    this.movies.splice(this.movies.indexOf(movie),1);
  }

  //seance

  newSeanceDates: Date[] = [];
  newSeanceMovie: Movie;
  newSeanceRoom: Room;


  newSeanceMovieChanger(event) {
    let x = this.movies.filter((el, index) => {
      return el.title == event.target.value;
    });
    if (x[0]) {
      this.newSeanceMovie = x[0];
    }
  }

  newSeanceRoomChanger(event) {
    let x = this.rooms.filter(el => {
      return el.number == event.target.value;
    });
    if (x[0]) {
      this.newSeanceRoom = x[0];
    }
  }

  seances: Seance[] = [
    new Seance([new Date(2018 - 10 - 12), new Date(2018 - 10 - 12), new Date(2018 - 10 - 13), new Date(2018 - 10 - 14)], this.movies[1], this.rooms[2], [new Seat(1, 1), new Seat(3, 1), new Seat(2, 1), new Seat(1, 2), new Seat(1, 3), new Seat(2, 4)])
    , new Seance([new Date(2018 - 10 - 12), new Date(2018 - 10 - 12), new Date(2018 - 10 - 13), new Date(2018 - 10 - 14)], this.movies[1], this.rooms[2], [new Seat(1, 1), new Seat(3, 1), new Seat(2, 1), new Seat(1, 2), new Seat(1, 3), new Seat(2, 4)])
    , new Seance([new Date(2018 - 10 - 12), new Date(2018 - 10 - 12), new Date(2018 - 10 - 13), new Date(2018 - 10 - 14)], this.movies[1], this.rooms[2], [new Seat(1, 1), new Seat(3, 1), new Seat(2, 1), new Seat(1, 2), new Seat(1, 3), new Seat(2, 4)])
  ];
  addSeance() {
    if (this.newSeanceRoom && this.newSeanceMovie && this.newSeanceDates) {
      let newSeanceSeats: Seat[] = [];
      let rows = this.newSeanceRoom.rows;
      let columns = this.newSeanceRoom.columns;
      for (let i = 1; i <= rows; i++) {
        for (let j = 1; j <= columns; j++) {
          newSeanceSeats.push(new Seat(i, j));
        }
      } console.log(new Seance(this.newSeanceDates, this.newSeanceMovie, this.newSeanceRoom, newSeanceSeats));
      this.seances.push(new Seance(this.newSeanceDates, this.newSeanceMovie, this.newSeanceRoom, newSeanceSeats));
      this.newSeanceDates = [];
      this.newSeanceMovie = undefined;
      this.newSeanceRoom = undefined;
      newSeanceSeats = [];
    }
  }

  addDateTimeToSeance(day, hour) {
    let check = this.newSeanceDates.map((value, index) => {
      return value.getTime();
    })
    if (check.includes(new Date(new Date(day).setHours(hour.slice(0, 2), 0, 0, 0)).getTime())) {
      this.newSeanceDates.splice(check.indexOf(new Date(new Date(day).setHours(hour.slice(0, 2), 0, 0, 0)).getTime()), 1);
    } else {
      this.newSeanceDates.push(new Date(new Date(day).setHours(hour.slice(0, 2), 0, 0, 0)));
    }
  }
  removeDateTimeFromSeance(date) {

    let dateTime = date.getTime();
    let check = this.newSeanceDates.map((el) => {
      return el.getTime();
    });
    this.newSeanceDates.splice(check.indexOf(dateTime), 1);
  }
  constructor() { }

  ngOnInit() {

  }
}
