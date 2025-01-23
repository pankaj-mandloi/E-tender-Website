//use to define operations
const express = require('express');
const fs = require('fs');
const supplierRoute= express.Router();
var Supplier = require('./supplier.model');
const multer = require('multer');

//Register
supplierRoute.route('/register/').post((req,res)=>{
    var supplier = new Supplier(req.body);
    supplier.save().then(supplier=>{
       res.send("Registration Success!!");
       res.end();
    }).catch((err)=>{
        res.send(err);
        res.end();
    });
});

//Login
supplierRoute.route('/login').post((req,res)=>{
    var supplier = new Supplier(req.body);
    Supplier.findOne({$and:[{"suserid":supplier.suserid},{"suserpass":supplier.suserpass}]}).then((supplier)=>{
        res.send(supplier);
        res.end();
    }).catch((err)=>{
            res.send(err);
            res.end();
     });
});

//code to save user image into server side userimages folder ok
    const st = multer.diskStorage({
            destination:(req,file,cb)=>{cb(null,'./supplier/supplierimages/')},
            filename:(req,file,cb)=>{cb(null, file.originalname)},
    });
        const upload=multer({storage:st});

//save user image into server side userimages folder....ok
supplierRoute.route('/uploadsuserimage').post(upload.single('file'),((req,res)=>{
      //console.log("hello");
        res.send("File Uploaded");
       res.end();
    }));

//update user image into server side images folder ok
supplierRoute.route("/updatesuserimage/:soldimagename").post(upload.single('file'),(req,res)=>{
        console.log("Old User_Image "+req.params.soldimagename);
        deleteoldImage(req.params.soldimagename);
        res.send("New File Uploaded!!!");
        res.end();
     });

//delete user old image from server side images folder ok
    function deleteoldImage(soldimagename){
        var path="D:/MERN/ETenderProject/backend/server-app/supplier/supplierimages/"+soldimagename;
        fs.unlink(path,(err)=>{
            if(err){
                console.log(err);
            }else{
                console.log('old image was deleted!!!');
            }
        });
    }
    
//update or edit profile records
supplierRoute.route('/editprofile').put((req,res)=>{
    Supplier.updateOne({"suserid":req.body.suserid},{$set:{"suserpass":req.body.suserpass,"sfullname":req.body.sfullname,
        "stid":req.body.stid,"ctid":req.body.ctid,
    "saddress":req.body.saddress,"semail":req.body.semail,"spicname":req.body.spicname,"spcatgid":req.body.spcatgid,
    "sranking":req.body.sranking}}).then((supplier)=>{      
        if(supplier.modifiedCount>0){
            res.send("Supplier User Data Updated!!");
            res.end();
        }else{
            res.send("Supplier User Data Not Modified!!");
            res.end();
        }
        }).catch((err)=>{
                res.send(err);
                res.end();
        });
});

//code for checking supplier user is allready register or not...
supplierRoute.route("/checkid/:suserid").get((req,res)=>{
    //var found=false;
    Supplier.findOne({"suserid":req.params.suserid}).then((supplier)=>{
                //if(req.params.suserid==supplier.suserid){
                   // found=true;
                    //res.send(found);
                   res.send(supplier);
                   res.end();
               }).catch((err)=>{
                   res.send(err);
                   res.end();
               });
           });

//get user image
supplierRoute.route("/getsuserimage/:spicname").get((req,res)=>{
    res.sendFile("D:/MERN/ETenderProject/backend/server-app/supplier/supplierimages/"+req.params.spicname);
});
module.exports = supplierRoute;