import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  loading = false;
  registerForm: FormGroup;
  formSubmitted = false;
  errorMsg: string = '';

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
    this.registerForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      age: ['', [Validators.required, Validators.min(1)]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  onSubmit() {
    this.formSubmitted = true;
    if (this.registerForm.valid) {
      this.loading = true;
      this.authService.register(this.registerForm.value).subscribe({
        next: (res) => {
          if(res.success) {
            this.router.navigate(['auth/login', {msg: 'Registration was successful, Login here.'}])
          }
          this.loading = false;
        },
        error: (err) => {
          this.errorMsg = err.error.error
          this.loading = false;
        }
      })
    }
  }

}
