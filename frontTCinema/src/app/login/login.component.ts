import { FlashMessagesService } from 'angular2-flash-messages';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  email: string;
  password: string;

  constructor(private authService: AuthService, private router:Router, private flashmessagesservice:FlashMessagesService) { }

  ngOnInit() {
  }

  onLoginSubmit(){
    const user = {
      email: this.email,
      password: this.password
    }
    this.authService.authenticateUser(user).subscribe(data => {
      if(data.json().success){
        this.authService.storeUserData(data.json().token,data.json().user);
        this.flashmessagesservice.show("You are now logged in", {cssClass:"alert-success text-center", timeout: 3000});
        this.router.navigate(['dashboard']);
      }else{
        this.flashmessagesservice.show(data.json().msg, {cssClass:"alert-danger text-center", timeout: 3000});
        this.router.navigate(['login']);

      }
    });
  }

}
