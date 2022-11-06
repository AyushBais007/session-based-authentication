import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { PracticeComponent } from '../../angular-university/practice.component';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, AfterViewInit {
  loginForm: any;
  showTwo = false;
  //     @ViewChildren(BubbleComponent) bubble: QueryList<BubbleComponent>

  constructor(private fb: FormBuilder, private auth: AuthService, private dialog: MatDialog, private cookie: CookieService, private router: Router) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      name: ['', Validators.required],
      password: ['',Validators.required]
    })
    //this.open();
    // this.auth.get().subscribe((res:any)=>{
    //   console.log(res)
    // })
    // this.auth.get('login').subscribe((res:any)=>{
    //   console.log(res)
    // })
    //let otp = Math.floor((Math.random() * 1000000));
    //console.log(otp);
  }

  ngAfterViewInit(): void {
    let role = this.auth.getCurrentUser();
    switch (role) {
      case '1':
        this.router.navigate(['/common']);
        break;
      case '2':
        this.router.navigate(['/common']);
        break;
      default:
        break;
    }
  }


  open() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;

    dialogConfig.data = {
      id: 1,
      title: 'Angular For Beginners'
    };
    this.dialog.open(PracticeComponent, dialogConfig)
  }

  login() {
    this.auth.post('login', this.loginForm.value).subscribe((res: any) => {
      if (res.success == true) {
        var role = this.cookie.get('role_id');
        console.log(this.cookie.get('role_name'))
        if (role == '1') {
          //var token = localStorage.getItem('token')
          //console.log(token);
          this.router.navigate(['/common']);
        }
        else if (role == '2') {
          //var token = localStorage.getItem('token')
          this.router.navigate(['/common']);
        }
      }
      else {
        Swal.fire({ title: res.msg, icon: 'error' })
      }
    })
    console.log(this.cookie.getAll())
  }

  // otp() {
  //   let otp = Math.floor((Math.random() * 1000) + 1);
  //   console.log(otp)
  // }

}
