import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { MatDrawer } from '@angular/material/sidenav';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {
  @ViewChild('sidenav')
  sidenav!: MatDrawer;
  isShowSidebar = true;
  progresssValue:any = 0;

  constructor(private auth:AuthService) { }

  @HostListener('window:scroll',['$event'])
  onScroll(event)
  { 
    let scrollHeight = event.target.scrollTop;
    console.log(scrollHeight)
    this.getProgessValue(event.target);
  }

  getProgessValue(el)
  {
    const height = el.scrollHeight - el.clientHeight;
    this.progresssValue = Math.round((el.scrollTop/height) * 100)
  }

  ngOnInit(): void {
    // this.auth.get('common').subscribe(res=>{
    //   //console.log(res);
    // });
  }


}
