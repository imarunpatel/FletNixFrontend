import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-splash',
  templateUrl: './splash.component.html',
  styleUrls: ['./splash.component.scss']
})
export class SplashComponent implements OnInit {

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    // if(!localStorage.getItem('token')) {
    //   this.router.navigate(['auth/login']);
    // } else {
    //   this.getSelf()
    // }
  }

  // getSelf() {
  //   this.authService.getSelf().subscribe({
  //     next: (res) => {
  //       this.router.navigate(['dashboard']);
  //     },
  //     error: (err) => {
  //       this.router.navigate(['auth/login']);
  //     }
  //   })
  // }

}
