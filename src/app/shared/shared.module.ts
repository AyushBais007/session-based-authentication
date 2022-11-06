import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

//import {MatProgressSpinnerModule} from '@angular/material'
import { MatInputModule } from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule} from '@angular/material/toolbar';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule} from '@angular/material/icon';
import { FlexLayoutModule } from '@angular/flex-layout'
import {MatMenuModule} from '@angular/material/menu';
import {  MatListModule } from '@angular/material/list';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material/core';
import {MatStepperModule} from '@angular/material/stepper';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatProgressBarModule} from '@angular/material/progress-bar'
import { ReactiveFormsModule } from '@angular/forms'; 
import { FormsModule } from '@angular/forms'; 
import { MatPaginatorModule } from '@angular/material/paginator';
import { FullCalendarModule } from '@fullcalendar/angular';
import interactionPlugin from '@fullcalendar/interaction';
import dayGridPlugin from '@fullcalendar/daygrid';
// import { SpinnerComponent } from './spinner/spinner.component';




FullCalendarModule.registerPlugins([interactionPlugin, dayGridPlugin]);

@NgModule({
  declarations: [
  
  ],
  imports: [
    FullCalendarModule,
    CommonModule,
    MatTableModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports : [
    MatProgressBarModule,
    MatPaginatorModule,
    FormsModule,
    ReactiveFormsModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatTableModule,
   MatInputModule,
   MatButtonModule,
   MatDialogModule,
   MatSidenavModule,
   MatIconModule,
   MatDividerModule,
   MatToolbarModule,
   FlexLayoutModule,
   MatMenuModule,
   MatListModule,
   MatCardModule,
   MatNativeDateModule,
   MatStepperModule,
  FullCalendarModule,
  
  ]
})
export class SharedModule { }
