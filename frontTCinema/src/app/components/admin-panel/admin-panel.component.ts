import { DBConnectionService } from './../../services/dbconnection.service';
import { Room } from './../../classes/room';
import { Seance } from './../../classes/seance';
import { Movie } from './../../classes/movie';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.css']
})
export class AdminPanelComponent implements OnInit {

  datepickerPage = 0;
  todayDate = new Date(Date.now()).getTime();
  hoursToView: String[] = ["10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00", "19:00", "20:00", "21:00", "22:00",];
  todaydate: number = new Date(new Date(Date.now()).setHours(10, 0, 0, 0)).getTime();
  daysToView2: Date[] = [new Date(this.todaydate), new Date(this.todaydate + (1000 * 60 * 60 * 24 * 1)), new Date(this.todaydate + (1000 * 60 * 60 * 24 * 2)), new Date(this.todaydate + (1000 * 60 * 60 * 24 * 3)), new Date(this.todaydate + (1000 * 60 * 60 * 24 * 4)), new Date(this.todaydate + (1000 * 60 * 60 * 24 * 5)), new Date(this.todaydate + (1000 * 60 * 60 * 24 * 6))];

  seances: Seance[] = [];
  rooms: Room[] = [];
  movies: Movie[] = [];


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
  newRoomNumber;

  addRoom(newRoomNumber, newRoomRows, newRoomColumns) {
    this.dbservice.addRoom(newRoomNumber, newRoomRows, newRoomColumns)
      .subscribe((observer) => {
        if (observer['success']) {
          this.rooms.push(new Room(observer['roomId'], newRoomNumber, newRoomRows, newRoomColumns));
        }
      }, (err) => {
        throw err;
      });
  }

  deleteRoom(room: Room) {
    this.dbservice.deleteRoom(room).subscribe((observer) => {
      if (observer['success']) {
        this.rooms.splice(this.rooms.indexOf(room), 1);
      }
    }, (err) => {
      throw err;
    });
  }
  //movie

  newMovieTitle: String;
  newMovieProductionYear: Date;
  newMovieDirector: String;
  addMovie(newMovieTitle, newMovieProductionYear, newMovieDirector) {
    this.dbservice.addMovie(newMovieTitle, newMovieProductionYear, newMovieDirector)
      .subscribe((observer) => {
        if (observer['success']) {
          this.movies.push(new Movie(observer['movieId'], newMovieTitle, newMovieProductionYear, newMovieDirector));
        }
      }, (err) => {
        throw err;
      });
  }

  deleteMovie(movie) {
    console.log(movie.id)
    this.dbservice.deleteMovie(movie.id)
      .subscribe((observer) => {
        if (observer['success']) {
          
          let foundSeances = {seances: this.seances.filter((seance) => {
            return seance.movie.id == movie.id 
          })};
          console.log(foundSeances);
          this.dbservice.deleteSeances(foundSeances.seances).subscribe((observer2) => {
            if(observer2['success']){
              for (const seance of foundSeances.seances) {
                this.seances.splice(this.seances.indexOf(seance),1);
              }
            }
          })
          this.movies.splice(this.movies.indexOf(movie), 1);
        }
      }, (err) => {
        throw err;
      })
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

  addSeance(newSeanceRoom, newSeanceMovie, newSeanceDates) {
    this.dbservice.addSeance(newSeanceRoom, newSeanceMovie, newSeanceDates).subscribe((observer: any) => {
      console.log(observer);
      let movie: Movie, room: Room;
      movie = this.movies.find((movie) => {
        return movie.id == observer.seance.movie;
      })
      room = this.rooms.find((room) => {
        return room.id == observer.seance.room;
      })
      // console.log(movie, room);
      if(observer['success']){
        this.seances.push(new Seance(observer.seance.id,observer.seance.dates,movie,room,observer.seance.seats))
        this.newSeanceDates.length = 0;
      }
    })
    // this.newSeanceMovie = this.movies[0];
    // this.newSeanceRoom = this.rooms[0];
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




  constructor(private dbservice: DBConnectionService) { }

  ngOnInit() {

    this.dbservice.getRooms()
      .subscribe((roomsJSON: any) => {
        for (let room of roomsJSON.rooms) {
          this.rooms.push(new Room(room._id, room.number, room.rows, room.columns));
        }
      });
      this.dbservice.getMovies()
      .subscribe((res: any) => {
        for (let movie of res.movies) {
          this.movies.push(new Movie(movie._id, movie.title, movie.productionYear, movie.director));
        }
      })

    this.dbservice.getSeances()
      .subscribe((observer: any) => {
        let realMovie;
        let realRoom;
        for (const seance of observer.seances) {
          realMovie = this.movies.find((movie) => {
            return movie.id === seance.movie
          })
          // console.log(`id seansu: ${seance._id}`)
          
          realRoom = this.rooms.find((room) => {
            return room.id === seance.room
          })
          if (realRoom && realMovie) {
            this.seances.push(new Seance(seance._id,seance.dates, realMovie, realRoom, seance.seats));
            }else{
              console.log("movie/room not found");          
            }
        }
      });
  }
}
