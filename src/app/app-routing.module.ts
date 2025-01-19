import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthLayoutComponent } from './layouts/auth/auth-layout.component';
import { MainLayoutComponent } from './layouts/main/main-layout.component';
import { AuthGuard } from './guard/auth.guard';

const routes: Routes = [
  {
    path: 'auth',
    component: AuthLayoutComponent,
    loadChildren: () => import('./layouts/auth/auth-layout.module').then(m => m.AuthLayoutModule),
  },
  {
    path: '',
    component: MainLayoutComponent,
    loadChildren: () => import('./layouts/main/main-layout.module').then(m => m.MainLayoutModule),
    canActivate: [AuthGuard]
  },
  {
    path: '**',
    redirectTo: 'auth'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
