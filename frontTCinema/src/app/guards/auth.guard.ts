import { FlashMessagesService } from 'angular2-flash-messages';
import { AuthService } from './../services/auth.service';
import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router:Router, private flashMessagesService: FlashMessagesService) {

   }

   canActivate(){
     if(this.authService.loggedIn()){
       return true;
     }else{
       this.flashMessagesService.show('Please log in first', {cssClass:"alert-danger text-center", timeout: 3000});
       this.router.navigate(['/login']);
       return false;
     }
   }
}
