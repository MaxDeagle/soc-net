import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../providers/auth/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {


  registerForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService
  ) {
    this.registerForm = this.fb.group({
      firstName: [null, Validators.required],
      secondName: [null, Validators.required],
      birth: [null, Validators.required],
      email: [null, Validators.required],
      city: [null, Validators.required],
      password: [null, Validators.required]
    });
  }

  ngOnInit() {
    localStorage.clear();
  }

  register() {
    if (this.registerForm.valid) {
      this.authService.register(
        this.registerForm.controls.email.value,
        this.registerForm.controls.firstName.value,
        this.registerForm.controls.secondName.value,
        this.registerForm.controls.birth.value,
        this.registerForm.controls.city.value,
        this.registerForm.controls.password.value
      ).subscribe((response) => {
        console.log(response);
        localStorage.setItem('currentUserId', response._id);
        this.router.navigate(['/user']);
      }, (err) => {
        console.error(err);
      });
    }
  }

  navigateToLogin() {
    this.router.navigate(['/auth/login']);
  }

}
