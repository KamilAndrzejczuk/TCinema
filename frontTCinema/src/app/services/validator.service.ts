import { Injectable } from '@angular/core';

@Injectable()
export class ValidatorService {

  constructor() { }

  validateRegister(user){
    if(user.firstName == undefined || user.lastName == undefined || user.email == undefined || user.phoneNumber == undefined || user.password == undefined){
      return false;
    }else {
      return true;
    }
  }

}
