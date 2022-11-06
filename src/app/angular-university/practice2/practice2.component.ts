import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { CommonService } from 'src/app/services/common.service';
import { MatTableDataSource } from '@angular/material/table';
import { SharedModule } from 'src/app/shared/shared.module';
import { MatTableModule } from '@angular/material/table';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { map } from 'rxjs';
import { MatPaginator } from '@angular/material/paginator';
import { PdfServiceService } from 'src/app/services/pdf-service.service';
import { jsPDF } from "jspdf";
import html2canvas from 'html2canvas';


@Component({
  selector: 'app-practice2',
  templateUrl: './practice2.component.html',
  styleUrls: ['./practice2.component.scss']
})
export class Practice2Component implements OnInit,AfterViewInit {
  
  @ViewChild(MatPaginator) paginator : MatPaginator | undefined;
  @ViewChild('canvas') canvas : ElementRef | undefined;
  role_id: any;
  public dataSource: any;
  public dataSource1: any;
  public displayedColumns: any = ['SNo', 'role_name', 'logged_in', 'logged_out', 'ip_address'];
  public sessionTableColumn: any = ['SNo', 'user_id', 'user_name', 'role_id', 'expiry','action']

  //public displayedColumns: any = ['SNo'];  
  constructor(private cookie: CookieService, private cms: CommonService, private router: Router,private pdf:PdfServiceService) { }

  ngOnInit(): void {
    this.role_id = this.cookie.get('role_id');
    this.getLoginHistory();
    this.getSessionDetails();
    //this.pdf.generate();
  }

  ngAfterViewInit(): void {
    this.getLoginHistory();
    this.getSessionDetails();
  }

  response_array: any = []
  getSessionDetails() {
    this.cms.get('admin/getFunction/getSessionDetails').pipe(
      map((res: any) => {
        this.response_array = res;
        console.log(res[0].data);
        this.response_array.forEach((el: { data: string; },index: string | number) => {
          console.log(res[index]);
          res[index].data = JSON.parse(el.data)
        })
        console.log(res);
        return res;
      })
    )
      .subscribe((response: any) => {
        if (response.length > 0) {
          this.dataSource = new MatTableDataSource(response);
        }
      })

  }

  getLoginHistory() {
    this.cms.get('admin/getFunction/loginhistory').subscribe((response: any) => {
      console.log(response)
      if (response.length > 0) {
        this.dataSource1 = new MatTableDataSource(response);
        this.dataSource1.paginator=this.paginator;
      }
      if (response.msg == 'auth failed') {
        Swal.fire({ title: 'only for admin', icon: 'error' }).then(res => {
          this.router.navigate(['/dashboard']);
        })
      }
    })
  }


  deleteSession(sessionId:any)
  {
    console.log(sessionId);
    this.cms.delete('admin/deleteFunction/deleteSession/'+ sessionId).subscribe((response:any)=>{
      console.log(response);
      if(response.affectedRows > 0)
      {
        Swal.fire({title:'sesssion deleted', icon:'success'})
      }
      else
      {
        Swal.fire({title:'something went wrong', icon : 'error'});
      }
      this.getSessionDetails();
      this.getLoginHistory();
    })
  }

   exportAsPDF()
   {
    // this.cms.get('pdf/makePdf').subscribe(res=>{console.log(res);})
    
    //var doc = new jsPDF({ filters: ["ASCIIHexEncode"] });
    //this.pdf.generate(); 

    const doc = new jsPDF("p", "pt", "a4");
    const source = document.getElementById("content")!;
    // doc.text("Test", 40, 20);
    doc.setFontSize(12)
    doc.html(source, {
      callback: function(pdf) {
        doc.output("dataurlnewwindow"); // preview pdf file when exported
      }
    });

    //    let data = this.canvas?.nativeElement;  
    //    console.log(data);
    //    html2canvas(data).then(canvas => {
    //    const contentDataURL = canvas.toDataURL('image/png')  // 'image/jpeg' for lower quality output.
    //    let pdf = new jsPDF(); //Generates PDF in landscape mode
    //    // let pdf = new jspdf('p', 'cm', 'a4'); Generates PDF in portrait mode
    //    pdf.addImage(contentDataURL, 'PNG', 0, 0, 200, 200);  
    //    pdf.save('Filename.pdf');   
    //  }); 
   }

}
