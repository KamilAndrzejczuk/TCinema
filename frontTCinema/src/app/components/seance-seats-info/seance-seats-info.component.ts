import { DBConnectionService } from './../../services/dbconnection.service';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-seance-seats-info',
  templateUrl: './seance-seats-info.component.html',
  styleUrls: ['./seance-seats-info.component.css']
})
export class SeanceSeatsInfoComponent implements OnInit {

  @Input() chosenSeanceSeats;

  reservationSeatsList = [];
  reservationSuccess = false;
  showReservationPersonInfo = false;  

  constructor(private dbservice: DBConnectionService) { }

  ngOnInit() {
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

  addSeatToReservationList(newSeat) {
    if (this.reservationSeatsList.filter(function (seat) {
      return seat._id === newSeat._id
    }).length && !newSeat.isReserved) {
      this.chosenSeanceSeats.map(seat => {
        if (seat._id === newSeat._id) {
          seat.isPreReserved = false;

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
 
}
