import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, CanLoad } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private auth:AuthService, private router:Router){}
  
  canActivate(route: ActivatedRouteSnapshot,state: RouterStateSnapshot) {
    if (this.auth.isLoggedIn()) {
      console.log(state.url);
      return true;  
    
    }
   // console.log(state.url);
    //if(state.url =)
    this.router.navigate(['/auth']);
    return false;
  }

  // CanLoad(route: ActivatedRouteSnapshot,state: RouterStateSnapshot){
  //   if(this.auth.isLoggedIn())
  //   {
  //     return false;
  //   }

  // }

}
