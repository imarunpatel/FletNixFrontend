import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  loading = false;

  constructor(private router: Router, private authService: AuthService) {}

  ngOnInit(): void {
    if(localStorage.getItem('token')) {
      this.getSelf()
    }
  }

  getSelf() {
    this.loading = true;
    this.authService.getSelf().subscribe({
      next: () => {
        this.router.navigate(['']);
        this.loading = false;
      },
      error: () => {
        this.router.navigate(['auth/login']);
        this.loading = false;
      }
    })
  }
}
