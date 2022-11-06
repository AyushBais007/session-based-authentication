import { Inject } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ConfirmedValidator } from 'src/app/directives/confirmed.validtor';
import { AuthService } from 'src/app/services/auth.service';
import { CommonService } from 'src/app/services/common.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-password-update',
  templateUrl: './password-update.component.html',
  styleUrls: ['./password-update.component.scss']
})
export class PasswordUpdateComponent implements OnInit {
  passwordsMatching:boolean=false;
  passwordUpdateForm: any

  constructor(private fb: FormBuilder, private dialog: MatDialog, public dialogRef: MatDialogRef<PasswordUpdateComponent>, @Inject(MAT_DIALOG_DATA) public data: any,private cms :CommonService,private router:Router,private auth:AuthService) { }
    
  ngOnInit(): void {
    this.passwordUpdateForm = this.fb.group({
      new_pass: [],
      confirm_pass: [,Validators.required]
    },
    // { 
    //   validator: ConfirmedValidator('new_pass', 'confirm_password')
    // }
    )


    // this.passwordUpdateForm.controls['confirm_pass'].valueChanges.subscribe((val:any) => {
    //   if (this.passwordUpdateForm.controls['new_pass'].value === val) {
    //     this.passwordsMatching = true;
    //     //this.confirmPasswordClass = 'form-control is-valid';
    //   } else {
    //     this.passwordsMatching = false;
    //     //this.confirmPasswordClass = 'form-control is-invalid'
    //   }
    //   console.log(this.passwordsMatching);
    // })
  }

  

  updatePassword() {
    this.cms.put('common/updateFunction/updatePassword',this.passwordUpdateForm.value).subscribe((res:any)=>{
      if(res.affectedRows > 0) 
      {
        Swal.fire({title:'password updated',icon:'success'}).then(res=>{
          this.auth.signOut();
          this.router.navigate(['/auth'])
        })
      }
      else{
        console.log(res);
        Swal.fire({icon:'error'});
      }
    })
  }

}
