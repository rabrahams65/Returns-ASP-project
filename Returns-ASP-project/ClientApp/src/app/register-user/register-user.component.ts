import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../api/services';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-register-user',
  templateUrl: './register-user.component.html',
  styleUrls: ['./register-user.component.css']
})
export class RegisterUserComponent implements OnInit {

  constructor(private userService: UserService, private fb: FormBuilder, private authService: AuthService, private router: Router, private activatedRoute: ActivatedRoute) { }

  requestedUrl?: string = undefined

  form = this.fb.group({
    email: [''],
    firstName: [''],
    lastName: ['']
    })

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(p => this.requestedUrl = p['requestedUrl'])
  }

  checkUser(): void {
    const params = { email: this.form.get('email')?.value! }

    this.userService.findUser(params).subscribe(
      this.login, e => {
        if(e.status != 404)
        console.error(e)
      }
    )
  }

  register() {
    this.userService.registerUser({ body: this.form.value }).subscribe(this.login,
      console.error)
  }

  private login = () => {
    this.authService.loginUser({ email: this.form.get('email')?.value! })
    this.router.navigate([this.requestedUrl ?? '/search-returns'])
  }

}
