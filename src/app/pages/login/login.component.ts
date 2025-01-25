import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  formSubmitted: boolean = false;
  isLoading: boolean = false;
  errorMsg: string = '';
  registerMsg: string | null = null;
  returnUrl: string = '/';

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router, private route: ActivatedRoute) { 
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  ngOnInit(): void {
    // Get return URL from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';

    this.route.params.subscribe({
      next: (params) => {
        this.registerMsg = params['msg'];
      }
    });
  }

  onSubmit() {
    this.formSubmitted = true;
    if (!this.loginForm.valid) return;

    this.isLoading = true;
    this.errorMsg = '';

    this.authService.login(this.loginForm.value.email, this.loginForm.value.password).subscribe({
      next: response => {
        if(response.success) {
          this.router.navigate([this.returnUrl]);
        }
        this.isLoading = false;
      },
      error: error => {
        this.errorMsg = error.error.error;
        this.isLoading = false;
      }
    });
  }
}
