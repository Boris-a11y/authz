import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent {
  constructor(private authService: AuthService, private router: Router) {}
  currentUser: any;

  getCurrentUser() {
    this.authService.currentUser().subscribe({
      next: (data) => {
        console.log(data);
        this.currentUser = data;
      },
    });
  }

  logout() {
    this.authService.logout().subscribe({
      next: (data) => {
        console.log(data);
        this.router.navigate(['/login']);
      },
    });
  }

  ngOnInit(): void {
    this.getCurrentUser();
  }
}
