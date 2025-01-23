//use to define operations
const express = require('express');
const companyRoute= express.Router();
var Company = require('./company.model');

//Register
companyRoute.route('/register/').post((req,res)=>{
    var company = new Company(req.body);
    company.save().then(company=>{
       res.send("Registration Success!!");
       res.end();
    }).catch((err)=>{
        res.send(err);
        res.end();
    });
});

//Login
companyRoute.route('/login').post((req,res)=>{
    var company = new Company(req.body);
    Company.findOne({$and:[{"cuserid":company.cuserid},{"cuserpass":company.cuserpass}]}).then((company)=>{
        res.send(company);
        res.end();
    }).catch((err)=>{
            res.send(err);
            res.end();
     });
});

//update or edit profile records
companyRoute.route('/editprofile').put((req,res)=>{
  Company.updateOne({"cuserid":req.body.cuserid},{$set:{"cuserpass":req.body.cuserpass,
                                                        "companyname":req.body.companyname,
                                                        "stid":req.body.stid,
                                                        "ctid":req.body.ctid,
                                                        "caddress":req.body.caddress,
                                                        "cemail":req.body.cemail,
                                                        "ccontact":req.body.ccontact}}).then((company)=>{      
        if(company.modifiedCount>0){
            res.send("Company User Data Updated!!");
            res.end();
        }else{
            res.send("Company User Data Not Modified!!");
            res.end();
        }
        }).catch((err)=>{
                res.send(err);
                res.end();
        });
});

//code for checking company user is allready register or not...
companyRoute.route("/checkid/:cuserid").get((req,res)=>{
    Company.findOne({"cuserid":req.params.cuserid}).then((company)=>{
                   res.send(company);
                   res.end();
               }).catch((err)=>{
                   res.send(err);
                   res.end();
               });
           });

module.exports = companyRoute;