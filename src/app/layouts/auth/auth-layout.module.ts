import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { LoginComponent } from 'src/app/pages/login/login.component';
import { AuthLayoutRoutes } from './auth-layout.routing';
import { RegisterComponent } from 'src/app/pages/register/register.component';

@NgModule({
    imports: [
        RouterModule.forChild(AuthLayoutRoutes),
        ReactiveFormsModule,
        CommonModule
    ],
    exports: [],
    declarations: [
        LoginComponent,
        RegisterComponent
    ],
    providers: [],
})
export class AuthLayoutModule { }
