const express = require('express');
const billRoute= express.Router();
var Bill = require('./bill.model');

//save bill
billRoute.route('/billsave').post((req,res)=>{
    let bill =new Bill(req.body);
    //console.log("Bill date :"+req.body.billdate)
    //console.log(bill);
    bill.save().then(bill=>{
        res.status(200).json({'bill':'bill added successfully'});
    
    }).catch(err=>{
        res.status(400).send("unable to save to database");
    });
});

//show all bill by suserid
billRoute.route('/billshow/:suserid').get((req,res)=>{
    Bill.find({"suserid":req.params.suserid}).then(bill=>{
        res.send(bill);
        res.end();
    }).catch(err=>{
        res.status(400).send("Data not found something went wrong");
    })
});

//get Id of last Entered bill to generate ID for next bill
billRoute.route('/getbillid').get((req,res)=>{
    Bill.find().sort({"billid":-1}).limit(1).then(bill=>{
        console.log(bill);
        res.send(bill);
        res.end();
    }).catch(err=>{
        res.status(400).send("Data not found something went wrong")
    })
});
module.exports=billRoute;