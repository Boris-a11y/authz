import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService
  ) {}

  currentUser: any;
  loginForm: FormGroup = this.fb.group({
    username: ['', Validators.required],
    password: [''],
  });

  login() {
    const userDto = this.loginForm.value;

    this.authService.login(userDto).subscribe({
      next: (data) => {
        console.log(data);
        this.authService.updateAbility(data);
        this.router.navigate(['/dashboard']);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
