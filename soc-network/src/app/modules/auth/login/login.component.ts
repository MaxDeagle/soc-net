import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/providers/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService
  ) {
    this.loginForm = this.fb.group({
      email: [null],
      password: [null]
    });
  }

  ngOnInit() {
  }

  login() {
    if (this.loginForm.controls.email.value) {
      this.authService.login(this.loginForm.controls.email.value).subscribe((response) => {
        console.log(response);
        localStorage.setItem('email', this.loginForm.controls.email.value);
        this.router.navigate(['/user']);
      });
    }
  }

}
