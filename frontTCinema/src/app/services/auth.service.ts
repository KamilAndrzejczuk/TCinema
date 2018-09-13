import { Http, Headers } from '@angular/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
@Injectable()
export class AuthService {

  authToken:any;
  user: any;

  constructor(private http:Http) { }

  registerUser(user):any{
    let headers = new Headers();
    headers.append('Content-Type','Application/json');
    return this.http.post('http://localhost:3000/users/register',user, {headers: headers});
  }
}
