import { Injectable } from '@angular/core';
import { jsPDF } from "jspdf";
//import pdfMake from 'pdfmake/build/pdfmake';
//import pdfFonts from 'pdfmake/build/vfs_fonts_old.js'

//pdfMake.vfs = pdfFonts.pdfMake.vfs;
import * as font1 from './../../assets/fonts/Mangal Regular-normal.js';
import * as font from './../../assets/fonts/TiroDevanagariHindi-Regular-normal.js';
import * as font2 from './../../assets/fonts/Gargi-normal.js';
//pdfMake.vfs = font.customVFS.myVfs;

// pdfMake.fonts = {
//   Noto: {
//     normal:,
//     bold: '',
//   },
// }

@Injectable({
  providedIn: 'root'
})
export class PdfServiceService {
  
   dd = {
    content: [
      {
        text: 'This paragraph uses header style and extends the alignment property',
        style: 'header',
        alignment: 'center'
      },
      {
        text: [
          ' छत्तीसग This paragraph uses header style and overrides bold value setting it back to false.\n',
          'Header style in this example sets alignment to justify, so this paragraph should be rendered \n',
          'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Malit profecta versatur nomine ocurreret multavit, officiis viveremus aeternum superstitio suspicor alia nostram, quando nostros congressus susceperant concederetur leguntur iam, vigiliae democritea tantopere causae, atilii plerumque ipsas potitur pertineant multis rem quaeri pro, legendum didicisse credere ex maluisset per videtis. Cur discordans praetereat aliae ruinae dirigentur orestem eodem, praetermittenda divinum. Collegisti, deteriora malint loquuntur officii cotidie finitas referri doleamus ambigua acute. Adhaesiones ratione beate arbitraretur detractis perdiscere, constituant hostis polyaeno. Diu concederetur.'
          ],
        style: 'header',
        bold: false
      }
    ],
    styles: {
      header: {
        fontSize: 18,
        bold: true,
        alignment: 'justify'
      }
    }
    
  }

  constructor() {
   // console.log(pdfMake);
   }
  
  generate()
  {
    var doc = new jsPDF({ filters: ["ASCIIHexEncode"] }); 
   // console.log(font);
   doc.addJS(font2);    
   doc.setFont("Gargi","normal")
   
   //doc.setFont("TiroDevanagariHindi-Regular","normal")  
   doc.text("छत्तीसग ब्राह्मण आवेदक ",10,10)
    //doc.setLanguage('hi');
    //console.log(doc.getFontList())
    //doc.save("a4.pdf");
    doc.autoPrint();
    window.open(doc.output('bloburl'),'_blank')
   // var win = window.open('','_blank')
    //pdfMake.createPdf(this.dd).open({},window);

   }

  

  

}
