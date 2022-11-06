//const {jsPDF} = require('jspdf');
//const font = require('../fonts/Gargi-normal');
var express = require('express');
var router = express.Router();
var p = require('path')
const PDFDocument = require('pdfkit')
//const muktaFont = require('../fonts/Mukta-Regular.ttf')
const fs = require('fs');


router.get('/makePdf',(req,res)=>{
//var b = fs.readFileSync(p.join(__dirname,'../fonts/Mukta-Regular.ttf'))
 var x = (__dirname + '../fonts/Mukta-Regular.ttf')
    const doc = new PDFDocument()
 // let filename = req.body.filename
  // Stripping special characters
  //filename = encodeURIComponent(filename) + '.pdf'
  // Setting response to 'attachment' (download).
  // If you use 'inline' here it will automatically open the PDF
  res.setHeader('Content-disposition', 'attachment; filename="' + "myFile.pdf" + '"')
  res.setHeader('Content-type', 'application/pdf')
  //const content = req.body.content
  doc.y = 300;
  //doc.font()
  var data = fs.readFileSync('../fonts/Mukta-Regular.ttf')
  doc.font(x).text("छत्तीसग ब्राह्मण आवेदक ayush", 50, 50);
  //doc.text("छत्तीसग ब्राह्मण आवेदक ", 50, 50)
  doc.pipe(res)
  doc.end()

//     var doc = new jsPDF({ filters: ["ASCIIHexEncode"] }); 
//    // console.log(font);
//    doc.addJS(font);    
//    doc.setFont("Gargi","normal")
   
//    //doc.setFont("TiroDevanagariHindi-Regular","normal")  
//    doc.text("छत्तीसग ब्राह्मण आवेदक ",10,10)
//     //doc.setLanguage('hi');
//     //console.log(doc.getFontList())
//     doc.save("a4.pdf");
//     //doc.autoPrint();
//    // window.open(doc.output('bloburl'),'_blank');
//     //doc.pipe(res)
//     //doc.end()
//     //res.setHeader('Content-disposition', 'attachment; filename="' + 'myfile.pdf' + '"')
//     //res.setHeader('Content-type', 'application/pdf')
//     res.send(doc);
})

function makePdf(){
    var doc = new jsPDF({ filters: ["ASCIIHexEncode"] }); 
   // console.log(font);
   doc.addJS(font);    
   doc.setFont("Gargi","normal")
   
   //doc.setFont("TiroDevanagariHindi-Regular","normal")  
   doc.text("छत्तीसग ब्राह्मण आवेदक ",10,10)
    //doc.setLanguage('hi');
    //console.log(doc.getFontList())
    //doc.save("a4.pdf");
    //doc.autoPrint();
   // window.open(doc.output('bloburl'),'_blank');
   doc.pipe(res)
  doc.end()
    doc.save('mypdf.pdf')
}

module.exports = router;