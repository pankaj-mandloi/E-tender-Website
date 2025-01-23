//use to define operations
const express = require('express');
const tenderRoute= express.Router();
var Tender = require('./tender.model');
var Quotation = require('../Quotation/quotation.model');

//save tender
tenderRoute.route('/save').post((req,res)=>{
    var tender = new Tender(req.body);
    tender.save().then(tender=>{
       res.send("Tender Posted Success!!");
       res.end();
    }).catch((err)=>{
        res.send(err);
        //res.end();
    });
});

//show Tender by company
tenderRoute.route('/showbycompany/:tenderbyid').get((req,res)=>{
    console.log("inside showcompany :"+ req.params.tenderbyid);
    Tender.find({"tenderbyid":req.params.tenderbyid}).then((tender)=>{
        res.send(tender);
        res.end();
    }).catch((err)=>{
        res.send(err);
        res.end();
    });
});

//show Tender by tender
tenderRoute.route('/showbytenderid/:tenderid').get((req,res)=>{
    Tender.findOne({"tenderid":req.params.tenderid}).then((tender)=>{
        res.send(tender);
        res.end();
    }).catch((err)=>{
        res.send(err);
        res.end();
    });
});

//show all tenders
tenderRoute.route('/showall').get((req,res)=>{
    Tender.find().then((tender)=>{
        res.send(tender);
        res.end();
    }).catch((err)=>{
        res.send(err);
        res.end();
    });
});

//show Tender by supplier catgory id
tenderRoute.route('/showtenderbycatgid/:pcatgid').get((req,res)=>{
    Tender.find({"pcatgid":req.params.pcatgid}).then((tender)=>{
        res.send(tender);
        res.end();
    }).catch((err)=>{
        res.send(err);
        res.end();
    });
});

//show Tender by company
tenderRoute.route('/showbycompanyid/:tenderbyid').get((req,res)=>{
   // console.log("inside showcompany :"+ req.params.tenderbyid);
    Tender.find({"tenderbyid":req.params.tenderbyid}).then((tender)=>{
        res.send(tender);
        res.end();
    }).catch((err)=>{
        res.send(err);
        res.end();
    });
});

module.exports = tenderRoute;