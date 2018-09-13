import { AuthService } from './../services/auth.service';
import { ValidatorService } from './../services/validator.service';
import { Component, OnInit } from '@angular/core';
import { FlashMessagesService} from 'angular2-flash-messages';
import { Router } from '@angular/router'
import { debug } from 'util';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  firstName: String;
  lastName: String;
  email: String;
  phoneNumber: String;
  password: String;
  repeatPassword: String;

  constructor(private router:Router, private authService:AuthService, private validate: ValidatorService, private flashMessagesService: FlashMessagesService) { }

  ngOnInit() {
  }

  onRegisterSubmit(){
    const newUser = {
      firstName: this.firstName,
      lastName: this.lastName,
      email: this.email,
      phoneNumber: this.phoneNumber,
      password: this.password
    };

    if(!this.validate.validateRegister(newUser)){
      this.flashMessagesService.show("Please fill all fields", {cssClass:"alert-danger text-center", timeout: 3000});
      return false;
    }
    // console.log(newUser);
    this.authService.registerUser(newUser).subscribe((data) => {
      let newData = data.json();
      if(newData.success){
      this.flashMessagesService.show("User Registered", {cssClass:"alert-success text-center", timeout: 5000});
      this.router.navigate(['/login']);
      }else{
      this.flashMessagesService.show(`Something went wrong: ${newData.msg}`, {cssClass:"alert-danger text-center", timeout: 5000});
      this.router.navigate(['/register']);

      }
    });
  }

}
