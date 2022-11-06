import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Practice2Component } from './practice2/practice2.component';
import { SharedModule } from '../shared/shared.module';



@NgModule({
  declarations: [
    Practice2Component
  ],
  imports: [
    CommonModule,
    SharedModule
  ],
})
export class AngularUniversityModule { }
