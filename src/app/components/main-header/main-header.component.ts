import { Component, OnInit } from '@angular/core';
import { IUser } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-main-header',
  templateUrl: './main-header.component.html',
})
export class MainHeaderComponent implements OnInit {
  user: IUser | null = null;

  constructor(public authService: AuthService) {}

  ngOnInit(): void {
    this.user = this.authService.user;
      this.authService.getUser().subscribe({
        next: (user) => {
          this.user = user;
        }
      })
  }

  onLogout() {
    const res = confirm('Are you sure you want to logout');
    if(res) {
      this.authService.logout();
    }
  }

}
