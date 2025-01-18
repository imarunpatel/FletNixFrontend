import { NgModule } from '@angular/core';
import { HomeComponent } from '../../pages/home/home.component';
import { RouterModule } from '@angular/router';
import { MainLayoutRoutes } from './main-layout.routing';
import { CommonModule } from '@angular/common';
import { PaginationComponent } from 'src/app/components/pagination/pagination.component';
import { ModalComponent } from 'src/app/components/modal/modal.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        RouterModule.forChild(MainLayoutRoutes),
    ],
    exports: [],
    declarations: [
    HomeComponent,
    PaginationComponent,
    ModalComponent
  ],
    providers: [],
})
export class MainLayoutModule { }
