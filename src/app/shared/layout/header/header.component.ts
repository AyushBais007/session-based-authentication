import { Component, Input, OnInit, Output,EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { MatDialog } from '@angular/material/dialog';
import { PasswordUpdateComponent } from 'src/app/auth/password-update/password-update.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  @Input() isMenuOpened: boolean = true;
  @Output() isShowSidebar = new EventEmitter<boolean>();

  constructor(private auth : AuthService,private router : Router,private dialog:MatDialog) { }

  ngOnInit(): void {
  }

  public openMenu(): void {
    this.isMenuOpened = !this.isMenuOpened;
    this.isShowSidebar.emit(this.isMenuOpened);
  }

  changePassword(){
    this.dialog.open(PasswordUpdateComponent,{disableClose: true})
  }
  logout(){
    this.auth.signOut()
    //this.auth.get('login/logut').subscribe((res: any) => {
    //   if(res){
    //     this.router.navigate(['auth']);
    //     console.log(res);
    //   }

    // })
  }

  // open(event :any){
  //   this.isShowSidebar =event
  // }

}
