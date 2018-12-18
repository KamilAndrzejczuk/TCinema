import { DBConnectionService } from './../../services/dbconnection.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-check-reservations',
  templateUrl: './check-reservations.component.html',
  styleUrls: ['./check-reservations.component.css']
})
export class CheckReservationsComponent implements OnInit {
  searchInput;
  reservation;
  constructor(private dbservice: DBConnectionService) { }

  searchButton() {
    this.dbservice.searchReservation(this.searchInput).subscribe(observer => {
      this.reservation = observer['reservation'][0];
    })

  }
  ngOnInit() {
  }

}
