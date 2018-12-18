import { DBConnectionService } from './../../services/dbconnection.service';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-reservation-person-info',
  templateUrl: './reservation-person-info.component.html',
  styleUrls: ['./reservation-person-info.component.css']
})
export class ReservationPersonInfoComponent implements OnInit {

  inputPersonInformation = {};
  success = false;

  @Input() reservationSeatsList;
  @Input() chosenSeanceSeats;
  @Input() seance;
  constructor(private dbservice: DBConnectionService) { }

  ngOnInit() {
  }

  submitReservation() {

    this.dbservice.reserveSeat(this.seance.seance._id,this.reservationSeatsList, this.inputPersonInformation).subscribe(observer => {
      this.chosenSeanceSeats.map(seat => {
        if (this.reservationSeatsList.includes(seat._id)) {
          seat.isReserved = true;
          seat.isPreReserved = false;
        }

      })
    });
    this.success = true;
  }

}
