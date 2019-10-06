import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router
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
      localStorage.setItem('email', this.loginForm.controls.email.value);
      this.router.navigate(['/user']);
    }
  }

}
