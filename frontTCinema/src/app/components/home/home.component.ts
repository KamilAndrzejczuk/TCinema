import { Movie } from './../../classes/movie';
import { DBConnectionService } from './../../services/dbconnection.service';
import { SeanceService } from './../../services/seance.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  todayDate = new Date(new Date(Date.now()).setHours(0, 0, 0, 0)).getTime();
  datesList: Date[] = [new Date(this.todayDate), new Date(this.todayDate + (1000 * 60 * 60 * 24 * 1)), new Date(this.todayDate + (1000 * 60 * 60 * 24 * 2)), new Date(this.todayDate + (1000 * 60 * 60 * 24 * 3)), new Date(this.todayDate + (1000 * 60 * 60 * 24 * 4)), new Date(this.todayDate + (1000 * 60 * 60 * 24 * 5)), new Date(this.todayDate + (1000 * 60 * 60 * 24 * 6))];
  chosenDate = this.todayDate;
  seances;
  filteredSeances;
  chosenSeance;
  chosenSeanceSeats;
  showSeats = false;
  movies: Movie[] = [];


  setChosenDate(newDate) {
    this.chosenDate = newDate;
  }
  constructor(private dbservice: DBConnectionService) { }

  reset(){
    this.showSeats = false;
    this.chosenSeanceSeats = undefined;
  }
  
  seanceSeatsInfo(seance, date) {
    this.chosenSeance = { seance, date };
    this.showSeats = true;
    this.dbservice.getSeatsForSeance(seance.seats.reduce((acc, next) => {
      acc.push(next._id);
      return acc;
    }, [])).subscribe(observer => {
      this.chosenSeanceSeats = observer['seats'].filter(function (seat) {
        return seat.date === date;
      })
    })
  }

  filterSeancesByDate(date) {
    let chosenDate = new Date(date).setHours(0, 0, 0, 0);
    let filteredSeances = [];
    this.chosenDate = date;
    this.seances.forEach(seance => {
      let filteredSeance = JSON.parse(JSON.stringify(seance));
      filteredSeance.dates = seance.dates.filter(function (eachDate) {
        return chosenDate === new Date(eachDate).setHours(0, 0, 0, 0);
      })
      if (filteredSeance.dates.length !== 0) {
        filteredSeances.push(filteredSeance);
      }
    });
    filteredSeances.map((seance => {
      this.movies.map(movie => {
        if (movie['_id'] == seance.movie) {
          seance.movieTitle = movie.title;
        }
      })
    }))
    this.filteredSeances = filteredSeances;

  }
  ngOnInit() {
    this.dbservice.getSeances().subscribe(data => {
      this.seances = data['seances'];

      this.filterSeancesByDate(this.chosenDate);
    });

    this.dbservice.getMovies().subscribe(observer => {
      this.movies = observer['movies']
    })
  }

}
