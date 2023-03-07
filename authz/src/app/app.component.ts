import { Component } from '@angular/core';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  constructor(private authService: AuthService) {}
  title = 'authz';

  ngOnInit(): void {
    this.authService.currentUser().subscribe({
      next: (data) => {
        this.authService.updateAbility(data as any);
        console.log(data);
      },
    });
  }
}
