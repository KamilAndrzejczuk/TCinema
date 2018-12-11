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
  reservationSeatsList = [];
  inputPersonInformation = {};

  lognijmicos() {
    console.log(this.inputPersonInformation)
  }

  setChosenDate(newDate) {
    this.chosenDate = newDate;
  }
  constructor(private seanceService: SeanceService) { }


  addSeatToReservationList(newSeat) {
    if (this.reservationSeatsList.filter(function (seat) {
      return seat._id === newSeat._id
    }).length && !newSeat.isReserved) {
      this.filteredSeances.map(seance => {
        seance.seats.map(seat => {
          if (seat._id === newSeat._id) {
            seat.isPreReserved = false;

          }
        })
      })
      this.reservationSeatsList.splice(
        this.reservationSeatsList.findIndex(function (seat) {
          return seat._id === newSeat._id
        }), 1);
    }
    else {
      this.reservationSeatsList.push(newSeat);
      this.filteredSeances.map(seance => {
        seance.seats.map(seat => {
          if (seat._id === newSeat._id) {
            seat.isPreReserved = true;
            console.log(seat, newSeat);

          }
        })
      })
    }
  }
  seanceSeatsInfo(seance, date) {
    this.chosenSeance = { seance, date };
    this.chosenSeanceSeats = seance.seats.filter(function (seat) {
      return seat.date === seance.date;
    })
  }

  seatButtonWidth() {
    let rowLength = 0;
    this.chosenSeanceSeats.map((seat) => {
      if (rowLength < seat.column) {
        rowLength = seat.column;
      }
    });
    return `${100 / rowLength - 1}%`
  }

  filterSeancesByDate(date) {
    let chosenDate = new Date(date).setHours(0, 0, 0, 0);
    let filteredSeances = [];

    this.seances.forEach(seance => {
      let filteredSeance = JSON.parse(JSON.stringify(seance));
      filteredSeance.dates = seance.dates.filter(function (eachDate) {
        return chosenDate === new Date(eachDate).setHours(0, 0, 0, 0);
      })
      if (filteredSeance.dates.length !== 0) {
        filteredSeances.push(filteredSeance);
      }
    });
    this.filteredSeances = filteredSeances;
  }
  ngOnInit() {
    this.seanceService.getSeances().subscribe(data => {
      this.seances = data['seances'];

      this.filterSeancesByDate(this.chosenDate);
    });
  }

}
