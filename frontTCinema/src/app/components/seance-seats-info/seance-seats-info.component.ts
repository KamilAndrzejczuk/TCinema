import { DBConnectionService } from './../../services/dbconnection.service';
import { Component, OnInit, Input } from '@angular/core';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-seance-seats-info',
  templateUrl: './seance-seats-info.component.html',
  styleUrls: ['./seance-seats-info.component.css']
})
export class SeanceSeatsInfoComponent implements OnInit {

  @Input() chosenSeanceSeats;
  @Input() seance;

  reservationSeatsList = [];
  reservationSuccess = false;
  showReservationPersonInfo = false;
  chosenSeanceSeatsForHTML = [];
  rowLength = 0;
  colLength = 0;

  constructor(private dbservice: DBConnectionService) {

  }

  ngOnInit() {
  }
  ngOnChanges(change) {
    
    if (change.chosenSeanceSeats.currentValue) {
      let len = change.chosenSeanceSeats.currentValue.length;
      this.rowLength = change.chosenSeanceSeats.currentValue[len - 1].row;
      this.colLength = change.chosenSeanceSeats.currentValue[len - 1].column;
      
      for(let i = 1 ; i <= this.rowLength; i++){
        this.chosenSeanceSeatsForHTML.push(change.chosenSeanceSeats.currentValue.slice((i - 1) * this.colLength, i * this.colLength))
      }
    }
  }



  seatButtonWidth() {
    return `${this.rowLength * 44 + 9 * (this.rowLength - 2)}`
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
