import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-main-header',
  templateUrl: './main-header.component.html',
})
export class MainHeaderComponent {
  user$ = this.authService.user$;

  constructor(public authService: AuthService) {}

  onLogout() {
    const res = confirm('Are you sure you want to logout');
    if(res) {
      this.authService.logout();
    }
  }

}
