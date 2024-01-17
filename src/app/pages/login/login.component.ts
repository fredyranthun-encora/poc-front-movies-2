import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { NgIf } from '@angular/common';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  loginForm: FormGroup;
  isLoggingIn: boolean = false;
  isLoginFormValid = false;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private toastr: ToastrService,
  ) {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  checkValid() {
    if (this.loginForm.valid !== this.isLoginFormValid) {
      this.isLoginFormValid = this.loginForm.valid;
    }
  }

  onLogin() {
    this.isLoggingIn = true;
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;
      this.authService.Login(email, password).subscribe({
        next: (user) => {
          console.log(user);
          this.isLoggingIn = false;
          this.router.navigate(['favorites']);
        },
        error: (err) => {
          console.error(err);
          this.toastr.error(err.message, 'Error on login');
          this.isLoggingIn = false;
          this.loginForm.reset();
        },
      });
    }
  }
}
