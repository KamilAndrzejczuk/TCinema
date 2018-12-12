import { DBConnectionService } from './../../services/dbconnection.service';
import { SeanceService } from './../../services/seance.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

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
  reservationSuccess = false;


  submitReservation() {
    let seats = this.reservationSeatsList.map(seat => seat._id);
    this.dbservice.reserveSeat(seats, this.inputPersonInformation).subscribe(observer => {
      this.chosenSeanceSeats.map(seat => {
        if (seats.includes(seat._id)) {
          seat.isReserved = true;
          seat.isPreReserved = false;
        }

      })

      this.reservationSuccess = true;
    });

  }

  setChosenDate(newDate) {
    this.chosenDate = newDate;
  }
  constructor(private router: Router, private seanceService: SeanceService, private dbservice: DBConnectionService) { }


  addSeatToReservationList(newSeat) {
    if (this.reservationSeatsList.filter(function (seat) {
      return seat._id === newSeat._id
    }).length && !newSeat.isReserved) {
      this.chosenSeanceSeats.map(seat => {
          if (seat._id === newSeat._id) {
            seat.isPreReserved = false;
            console.log(seat._id);

          }
        
      })
      this.reservationSeatsList.splice(
        this.reservationSeatsList.findIndex(function (seat) {
          return seat._id === newSeat._id
        }), 1);
    }
    else if (!newSeat.isReserved) {
      this.reservationSeatsList.push(newSeat);
      this.chosenSeanceSeats.map(seat => {
          if (seat._id === newSeat._id) {
            seat.isPreReserved = true;
          }
        })
      
    }
  }
  seanceSeatsInfo(seance, date) {
    this.chosenSeance = { seance, date };
    this.dbservice.getSeatsForSeance(seance.seats.reduce((acc, next) => {
      acc.push(next._id);
      return acc;
    }, [])).subscribe(observer => {
      this.chosenSeanceSeats = observer['seats'].filter(function (seat) {
        return seat.date === date;
      })
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
