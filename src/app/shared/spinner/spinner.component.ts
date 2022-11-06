import { DOCUMENT } from '@angular/common';
import { Component, Inject, Input, OnDestroy, OnInit } from '@angular/core';
import { NavigationCancel, NavigationEnd, NavigationError, NavigationStart, Router } from '@angular/router';
import { SpinnerService } from 'src/app/services/spinner.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.scss']
})
export class SpinnerComponent implements OnInit,OnDestroy {

  public isSpinnerVisible = true;
  @Input()
  public backgroundColor = 'rgba(0, 115, 170, 0.69)';
  constructor(private router: Router,private spinnerS:SpinnerService,private spin:NgxSpinnerService) {
      // this.router.events.subscribe(
      //   event => {
      //     if (event instanceof NavigationStart) {
      //       this.isSpinnerVisible = true;
      //     } else if (
      //       event instanceof NavigationEnd ||
      //       event instanceof NavigationCancel ||
      //       event instanceof NavigationError
      //     ) {
      //       this.isSpinnerVisible = false;
      //     }
      //   },
      // () => {
      //   this.isSpinnerVisible = false;
      // }
    //);
  }
  ngOnInit(): void {
    this.spinnerS.visible$.subscribe((res:any)=>{
      this.isSpinnerVisible=res;
      if(res==true)
      {
        this.spin.show();
      }
      
    })
    //throw new Error('Method not implemented.');
  }

  ngOnDestroy(): void {
    this.isSpinnerVisible = false;
  }

}
