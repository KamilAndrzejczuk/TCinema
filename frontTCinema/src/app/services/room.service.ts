import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Room } from '../classes/room';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RoomService {

  baseURL = `http://localhost:3000/room`;
  constructor(private http: HttpClient) { }

  //room
  newRoomColumns: Number;
  newRoomRows: Number;
  rooms: Room[] = [];

  addRoom(newRoomNumber, newRoomRows, newRoomColumns) {
    // this.rooms.push(room);
    return this.http.post(`${this.baseURL}/add`, {
      number: newRoomNumber,
      columns: newRoomColumns,
      rows: newRoomRows
    });
  }

  getRooms() {
    return this.http.get(`${this.baseURL}/getRooms`)

  }

  deleteRoom(room: Room) {
    return this.http.request('delete',`${this.baseURL}/remove`, {body:{number: room.number}});
  }
}
