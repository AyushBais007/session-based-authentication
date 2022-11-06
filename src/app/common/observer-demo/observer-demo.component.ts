import { Component, OnInit } from '@angular/core';
import {Observable, Subject, BehaviorSubject, from, fromEvent, filter, tap } from 'rxjs';
import { AuthService } from '../../services/auth.service';
import { CommonService } from '../../services/common.service';
import Swal from 'sweetalert2';
import { Calendar } from '@fullcalendar/core';
import { CalendarOptions } from '@fullcalendar/angular';
import bootstrap5Plugin from '@fullcalendar/bootstrap5';

@Component({
  selector: 'app-observer-demo',
  templateUrl: './observer-demo.component.html',
  styleUrls: ['./observer-demo.component.scss']
})
export class ObserverDemoComponent implements OnInit {
  calendarEl = document.getElementById('calendar');
  dataSource: any;
  displayedColumns: any = ["SNo", "reason_english", "reason_hindi", "type", "status", "Action"];
  Events: any[] = [];
  calendarOptions: CalendarOptions = {
    //plugins: [ bootstrap5Plugin ],
    themeSystem: 'bootstrap5',
    headerToolbar: {
      left: 'prev,next today',
      center: 'title',
      right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek'
    },
    dateClick: this.handleDateClick.bind(this),
    events: [
      { title: '15', date: '2022-06-01' },
      { title: 'event 2', date: '2022-06-02' }
    ],
    initialView: 'dayGridMonth',
    weekends: true,
    editable: true,
    selectable: true,
    selectMirror: true,
    dayMaxEvents: true
  };
  
  constructor(private cms : CommonService) { }
  handleDateClick(arg:any) {
    alert('date click! ' + arg.dateStr)
  }

  ngOnInit(): void {
    // const observer$= new Observable((observer) => {
    //   observer.next(Math.random());
    // });

    //const subject= new Subject()
    //subject.subscribe((d: any)=>console.log(d),);
    //subject.subscribe((d: any)=>console.log(d));

    //subject.next(Math.random());
    //observer$.subscribe(subject);
   // console.log(data);

  //const observable=new observable(obj=>obj.next())

   //observer$.subscribe((d: any)=>console.log(d));
  // observer$.subscribe((d: any)=>console.log(d));
  // 
  
  // const arr$=from([1,2,3]);
  // arr$.subscribe((data)=>{
  //   (console.log(data))
  // })


  // const obser$=new Subject<string>();
  // obser$.subscribe((data)=>{
  //   console.log(data);
  // });


  fromEvent<MouseEvent>(document,'click')
  .pipe(filter(data =>  
   data.clientX>300 && data.clientY>300
  ))
  .subscribe(data=>console.log(data));
  }




  
  check(){
    this.cms.get('login/home').subscribe((res:any)=>{
      if(res)
      {
        Swal.fire({title:'authentic user' , icon:'success'}) 
        console.log('success')
      }
      else{
        Swal.fire({title:'something went wrong' , icon:'error'}) 
        console.log(res);
      }
    })
  }

}
