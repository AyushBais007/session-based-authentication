import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  fruits:any = ['Mango', 'Apple', 'Banana', 'Grapes'];
  constructor() { }

  ngOnInit(): void {
  }

  arr(){
    this.fruits.forEach((element:any) => {
    console.log(element);
    });
  }
  
  // my_forEach(callback){
  //   for(let i=0;i<this.length;i++)
  //   {

  //   }
  // }


}
