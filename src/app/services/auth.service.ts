import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { CookieService } from 'ngx-cookie-service';



@Injectable({
  providedIn: 'root'
})
export class AuthService {
apiurl=environment.apiUrl;

  constructor(private http:HttpClient, private router: Router , private cookie:CookieService) { }

post(function_name:any,value:any){
  console.log(value);
    return this.http.post(this.apiurl + function_name , value,{
      withCredentials:true
    });
  }

get(function_name:any)
{
  return this.http.get(this.apiurl + function_name,{withCredentials:true});
  //return this.http.get("https://jsonplaceholder.typicode.com/users/1")
}

logout()
{
  return this.http.get(this.apiurl + 'login/logout',{withCredentials:true}).subscribe((res:any)=>{
    this.cookie.delete('role_id','/','localhost',false,'None');
    this.cookie.delete('role_name','/');
    this.cookie.delete('connect.sid','/');
    Swal.fire({title:'your session has been expired',icon:'error'}).then(res=>{
      this.router.navigate(['auth']);
    })
  })
  
}

signOut()
  {
    return this.http.get(this.apiurl + 'login/logout',{withCredentials:true}).subscribe((res:any)=>{
      this.cookie.delete('role_id','/','localhost',false,'None');
      this.cookie.delete('role_name','/');
      this.cookie.delete('connect.sid','/');
      this.router.navigate(['auth']);
    }) 
}

isLoggedIn(): boolean {
  const token = localStorage.getItem('token');
  const cookie = this.cookie.get('connect.sid');
  if (cookie) {
    return true;
  } else {
    return false;
  }
}

getCurrentUser()
{
  console.log(this.cookie.get('role_id'));
  return (this.cookie.get('role_id'));
}
}
