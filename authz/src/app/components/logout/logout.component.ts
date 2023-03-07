import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
})
export class LogoutComponent {
  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.authService.logout().subscribe({
      next: (data) => {
        console.log(data);
        this.router.navigate(['login']);
      },
    });
  }
}
