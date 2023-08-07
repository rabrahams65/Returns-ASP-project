import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  currentUser?: User;

  loginUser(user: User) {
    this.currentUser = user
    console.log("The logged in user's email address is: " + this.currentUser.email)
  }


}


interface User {
  email: string
}
