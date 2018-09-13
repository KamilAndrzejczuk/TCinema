import { Http, Headers } from '@angular/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { tokenNotExpired } from 'angular2-jwt';
import { Observable  } from 'rxjs';
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

  authenticateUser(user){
    let headers = new Headers();
    headers.append('Content-Type','Application/json');
    return this.http.post('http://localhost:3000/users/authenticate',user, {headers: headers});

  }

  storeUserData(token, user){
    localStorage.setItem('id_token', token);
    localStorage.setItem('user', JSON.stringify(user));

    this.authToken = token;
    this.user = user;
  }

  loggedIn(){
    return tokenNotExpired('id_token');
  }

  logout(){
    this.user = null;
    this.authToken = null;
    localStorage.clear();

  }

  getProfile(){
    return new Promise((res,rej) => {
      res(this.user);
    });
  }
}
