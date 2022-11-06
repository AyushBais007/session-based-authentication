import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { CommonService } from '../../services/common.service';
import Swal from 'sweetalert2';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder,FormGroup,Validators } from '@angular/forms';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  isLinear = false;
  firstFormGroup: any;
  secondFormGroup: any;
  isAdmin : boolean=false 

  constructor(private cms:CommonService, private activeRoute: ActivatedRoute , private cookie : CookieService, private router : Router, private  _formBuilder: FormBuilder ) { }
  public dataSource: any;
  ngOnInit(): void {
    this.firstFormGroup = this._formBuilder.group({
      firstCtrl: ['', Validators.required],
    });
    this.secondFormGroup = this._formBuilder.group({
      secondCtrl: ['', Validators.required],
    });
    
    if(this.cookie.get('role_id') == '1')
    {
      this.isAdmin = true;
    }
  }

  next(){
    this.cms.get('dashboard').subscribe((res:any)=>{
      console.log(res);
    })
  }

  route1(){
    const role_id = this.cookie.get('role_id')
    console.log(role_id)
    if ( role_id == '1')
    {
      this.router.navigate(['/practice']);
    }
    else
    {
      Swal.fire({title:'this route is only accessed by admin'})
    }
  }


  route2(){
    const role_id = this.cookie.get('role_id')
    if ( role_id == '1')
    {
      Swal.fire({title:'you are admin'})
    }
    else
    {
      Swal.fire({title:'this route is only accessed by admin'})
    }
  }

  route3(){
    const role_id = this.cookie.get('role_id')
    this.router.navigate(['common/home']);
      this.cms.get('common/getFunction/heightDetails').subscribe((res:any)=>{
        console.log(res);
      })
  }

  route4(){
    const role_id = this.cookie.get('role_id')

      this.cms.get('common/getFunction/hrpreasonDetails').subscribe((res:any)=>{
        console.log(res);
      })
  }

}
