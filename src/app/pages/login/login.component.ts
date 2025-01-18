import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  loginForm: FormGroup;
  formSubmitted = false;
  isLoading = false;
  errorMsg = '';

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) { 
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  onSubmit() {
    
    this.formSubmitted = true;
    if (!this.loginForm.valid) return;

    this.isLoading = true;

    this.authService.login(this.loginForm.value.email, this.loginForm.value.password).subscribe({
      next: response => {
        if(response.success) {
          localStorage.setItem('token', response.data.accessToken);
          this.router.navigate(['/']);
        }
        this.isLoading = false;
      },
      error: error => {
        this.errorMsg = error.error.error
        this.isLoading = false;
      }
    })
  }

}
