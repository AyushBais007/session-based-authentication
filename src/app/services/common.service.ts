import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CommonService {
  apiurl=environment.apiUrl;

  constructor(private http : HttpClient) { }

  post(function_name:any,value:any){
    console.log(value);
      return this.http.post(this.apiurl + function_name , value,{
        withCredentials:true
      });
    }

  get(function_name:any){
    return this.http.get(this.apiurl + function_name,{withCredentials:true});
  }

  put(function_name:any,value:any)
  {
    return this.http.put(this.apiurl + function_name ,value,{
      withCredentials:true
    });
  }

  delete(function_name:any)
  {
    return this.http.delete(this.apiurl + function_name ,{withCredentials:true});
  }
}
