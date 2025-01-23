//use to define operations
const express = require('express');
const quotationRoute= express.Router();
var Quotation = require('./quotation.model');

//save tender
quotationRoute.route('/save').post((req,res)=>{
    var quotation = new Quotation(req.body);
    quotation.save().then((quotation)=>{
       res.send("Quotation Posted Success!!");
       res.end();
    }).catch((err)=>{
        res.send(err);
        //res.end();
    });
});


//update quotation status by company accepted or rejected
quotationRoute.route('/update/:qid/:qstatus/:qstate').put((req,res)=>{

    Quotation.updateOne({"qid":req.params.qid},{$set:{"qstatus":req.params.qstatus,"qstate":req.params.qstate}}).then(quotation=>{
        res.send("Quotation Processd");
        res.end();
    }).catch(err=>{
        res.send(err);
        res.end();
    })
});


//show Quotation by tender id
quotationRoute.route('/showquotbytid/:tid').get((req,res)=>{
    //console.log(req.params.tid);
    Quotation.find({"tid":req.params.tid}).then((quotation)=>{
        res.send(quotation);
        res.end();
    }).catch((err)=>{
        res.send(err);
        res.end();
    });
});


module.exports = quotationRoute;