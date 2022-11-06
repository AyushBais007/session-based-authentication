import { Injectable } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {

  constructor(private auth:AuthService, private router: Router){}
  
  canActivate(route: ActivatedRouteSnapshot,state: RouterStateSnapshot) {
    
    if (this.auth.isLoggedIn()) {
      console.log(this.auth.getCurrentUser());
      console.log('logged in');
      return false;
    } else {

      console.log('not loogeed')
      return true;
    }
  }
  
}
