var express = require('express');
var router = express.Router();
var common = require('../models/common')

router.get('/getFunction/:function_name/:p1?/:p2?/:p3?',(req,res)=>{
    
    common[req.params.function_name]( function (err, result) {
        if (err) { res.json(err); }
        else { res.json(result); }
    })
})


router.put('/updateFunction/:function_name/:p1?/:p2?/:p3?',(req,res)=>{
    common[req.params.function_name]( req,function (err, result) {
        if (err) { res.json(err); }
        else { res.json(result); }
    })
})


module.exports=router;