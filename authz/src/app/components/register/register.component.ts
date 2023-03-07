import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { userDto } from 'src/app/dto/userdto';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService
  ) {}

  registerForm: FormGroup = this.fb.group({
    username: ['', [Validators.required, Validators.minLength(8)]],
    password: ['', Validators.required],
    role: [''],
  });

  errors!: string[];
  passwordError!: boolean;

  register() {
    const userDto: userDto = this.registerForm.value;

    this.authService.register(userDto).subscribe({
      next: (data) => {
        console.log(data);
        this.router.navigate(['/login']);
      },
      error: (err) => {
        this.errors = err.error.message;
      },
    });
  }

  ngOnInit(): void {
    this.passwordError = this.registerForm.hasError('password');
  }
}
