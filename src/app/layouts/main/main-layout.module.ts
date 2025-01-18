import { NgModule } from '@angular/core';
import { HomeComponent } from '../../pages/home/home.component';
import { RouterModule } from '@angular/router';
import { MainLayoutRoutes } from './main-layout.routing';
import { CommonModule } from '@angular/common';


@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(MainLayoutRoutes),
    ],
    exports: [],
    declarations: [
    HomeComponent
  ],
    providers: [],
})
export class MainLayoutModule { }
