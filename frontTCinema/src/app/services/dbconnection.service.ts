import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DBConnectionService {


  baseURL = `http://localhost:8080/seats`;

  constructor(private http: HttpClient) { }

  getSeatsForSeance(seanceSeats) {
    return this.http.post(`${this.baseURL}/getseats`,{seats: seanceSeats});
  }

  reserveSeat(seats, personInfo) {
    return this.http.post(`${this.baseURL}/reserve`,{seats: seats, personInfo: personInfo});
  }
}
