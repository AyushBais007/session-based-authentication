import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ObserverDemoComponent } from './observer-demo/observer-demo.component';
import { CommonRoutingModule } from './common-routing.module';



@NgModule({
  declarations: [
    DashboardComponent,
    ObserverDemoComponent,
    
  ],
  imports: [
    SharedModule,
    CommonModule,
    CommonRoutingModule,
   // FullCalendarModule
  ]
})
export class CommonNewModule { }
