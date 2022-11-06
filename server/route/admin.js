
var express = require('express');
var router = express.Router();
var admin = require('../models/admin');

router.get('/getFunction/:function_name/:p1?/:p2?/:p3?',(req,res)=>{
    // if(req.session.role == '1')
    // {
    //     console.log(req.session.role.role_id);
    // admin[req.params.function_name]( function (err, result) {
    //     if (err) { 
    //         res.json(err); }
    //     else { res.json(result); }
    // })
    // }
    // else
    // {
    //     res.json({
    //         msg: 'auth failed'
    //     })
    // }
    admin[req.params.function_name]( function(err,result) {
            if (err) { 
                res.json(err); }
            else { res.json(result); }
        })
})

router.delete('/deleteFunction/:function_name/:p1?/:p2?/:p3?',(req,res)=>{
    console.log(req.params)
    admin[req.params.function_name]( req.params,function(err,result) {
        if (err) { 
            res.json(err); }
        else { res.json(result); }
    })
})

module.exports = router;
