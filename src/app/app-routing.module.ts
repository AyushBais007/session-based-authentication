import { NgModule } from '@angular/core';
import { ExtraOptions, RouterModule, Routes } from '@angular/router';
import { Practice2Component } from './angular-university/practice2/practice2.component';
import { DashboardComponent } from './common/dashboard/dashboard.component';
import { ObserverDemoComponent } from './common/observer-demo/observer-demo.component';
import { AuthGuard } from './guards/auth.guard';
import { LoginGuard } from './guards/login.guard';
import { HomeComponent } from './home/home.component';
import { LayoutComponent } from './shared/layout/layout.component';

const routerOptions: ExtraOptions = {
  scrollPositionRestoration: 'enabled',
  anchorScrolling: 'enabled',
  scrollOffset: [0, 64],
};

const routes: Routes = [
  { path: '', redirectTo: 'auth', pathMatch: 'full'},
  { path:'home',component:HomeComponent},
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule),
  },
  {
    path: '',
    component: LayoutComponent,
    canActivate: [AuthGuard],
    children:
      [
        {
          path: 'common',
          loadChildren: () => import('./common/common.module').then(m => m.CommonNewModule),
        
        },
        {
          path:'lazy',
          loadChildren:() => import('./lazy/lazy.module').then(m=> m.LazyModule),
          canActivate:[AuthGuard]
        },
        { path: 'lazy1', loadChildren: () => import('./lazy1/lazy1.module').then(m => m.Lazy1Module), canActivate:[AuthGuard] },
        { path: 'dashboard', canActivate: [AuthGuard], component: DashboardComponent },
        { path: 'home', canActivate: [AuthGuard], component: ObserverDemoComponent },
        { path: 'practice', canActivate: [AuthGuard], component: Practice2Component }
      ]
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes, routerOptions)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
