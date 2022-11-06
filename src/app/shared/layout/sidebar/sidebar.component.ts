import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  emp_name :any 
  constructor( private router:Router, private cookie : CookieService) { }

  ngOnInit(): void {
    this.emp_name = this.cookie.get('role_name');
  }

}
