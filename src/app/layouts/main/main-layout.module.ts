import { NgModule } from '@angular/core';
import { HomeComponent } from '../../pages/home/home.component';
import { RouterModule } from '@angular/router';
import { MainLayoutRoutes } from './main-layout.routing';
import { CommonModule } from '@angular/common';
import { PaginationComponent } from 'src/app/components/pagination/pagination.component';
import { ModalComponent } from 'src/app/components/modal/modal.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CustomSelectComponent } from 'src/app/components/custom-select/custom-select.component';
import { RemoveUnderscorePipe } from 'src/app/pipes/remove-underscore.pipe';


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
    ModalComponent,
    CustomSelectComponent,
    RemoveUnderscorePipe
  ],
    providers: [],
})
export class MainLayoutModule { }
