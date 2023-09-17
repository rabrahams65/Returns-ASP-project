import { Injectable } from '@angular/core';
import { UserService } from '../api/services';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private userService: UserService) { }

  currentUser?: User

  loginUser (user: User) {
    this.currentUser = user
  }
}


interface User {
  email: string
}
