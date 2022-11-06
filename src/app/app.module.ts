import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatSliderModule } from '@angular/material/slider';
import {MatSidenavModule} from '@angular/material/sidenav';
import { HttpClientModule } from '@angular/common/http';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from './shared/shared.module';
import { BubbleComponent } from './bubble/bubble.component';
import { PracticeComponent } from './angular-university/practice.component';
import { MatDialogModule } from '@angular/material/dialog';
import { HeaderComponent } from './shared/layout/header/header.component';
import { FooterComponent } from './shared/layout/footer/footer.component';
import { SidebarComponent } from './shared/layout/sidebar/sidebar.component';
import { LayoutComponent } from './shared/layout/layout.component';
import { CookieService } from 'ngx-cookie-service';
import { ErrorInterceptor } from './interceptor/http.interceptor';
import { AngularUniversityModule } from './angular-university/angular-university.module';
import { AuthModule } from './auth/auth.module';
import { CommonNewModule } from './common/common.module';
import { HomeComponent } from './home/home.component';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { SpinnerInterceptor } from './interceptor/spinner.interceptor';
import { SpinnerComponent } from './shared/spinner/spinner.component';
import { NgxSpinnerModule } from 'ngx-spinner';
@NgModule({
  entryComponents:[PracticeComponent],
  declarations: [
    AppComponent,
    BubbleComponent,
    PracticeComponent,
    HeaderComponent,
    FooterComponent,
    SidebarComponent,
    LayoutComponent,
    HomeComponent,
    SpinnerComponent
  ],
  imports: [
    AngularUniversityModule,
    MatDialogModule,
    SharedModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserModule,
    AppRoutingModule,
    MatSliderModule,
    MatSidenavModule,
    BrowserAnimationsModule,
    AuthModule,
    CommonNewModule,
    MDBBootstrapModule.forRoot(),
    NgxSpinnerModule,
  ],
  providers: [CookieService,
  {provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true},
  {provide: HTTP_INTERCEPTORS, useClass: SpinnerInterceptor, multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
