import { Component, OnInit,inject } from '@angular/core';
import { MAT_DIALOG_DATA,MatDialogRef } from '@angular/material/dialog';


@Component({
  selector: 'app-practice',
  templateUrl: './practice.component.html',
  styleUrls: ['./practice.component.scss']
})
export class PracticeComponent implements OnInit {

  constructor(private diaogref:MatDialogRef<PracticeComponent>) { }

  ngOnInit(): void {
  }


  unlock(){
    document.querySelector('.lock')?.classList.toggle('.unlock');
    this.diaogref.close();
  }
}
