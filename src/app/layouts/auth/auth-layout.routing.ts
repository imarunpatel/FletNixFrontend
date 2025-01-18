import { Routes } from '@angular/router'
import { LoginComponent } from 'src/app/pages/login/login.component'
import { RegisterComponent } from 'src/app/pages/register/register.component'

export const AuthLayoutRoutes: Routes = [
    {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full'
    },
    {
        path: 'register',
        component: RegisterComponent
    },
    {
        path: 'login',
        component: LoginComponent
    }
]