const express = require('express');
const productRoute = express.Router();
var Product = require('./product.model');
const multer = require('multer');

//save code
productRoute.route('/save').post((req,res)=>{
    let product = new Product(req.body);
    product.save().then(product=>{
        res.send("Product saved!!");
        res.end();
    }).catch(err=>{
        res.send("unable to save into database..")
    });
});

//show all product
productRoute.route('/supplierproductsearch:pcatgid').get((req,res)=>{
    console.log(req.params.pcatgid);
    Product.find({"pcatgid":req.params.pcatgid}).then((product)=>{
        res.send(product);
        res.end();
    }).catch((err)=>{
        res.send(err);
        res.end();
    })
});

//show all product
productRoute.route('/show').get((req,res)=>{
    Product.find().then((product)=>{
        res.send(product);
        res.end();
    }).catch((err)=>{
        res.send(err);
        res.end();
    })
});

//save product image
const st = multer.diskStorage({
    destination:(req,file,cb)=>{cb(null,'./product/productimages/')},
    filename:(req,file,cb)=>{cb(null, file.originalname)},
});
const upload=multer({storage:st});
//save product image into server side 
productRoute.route("/uploadproductimage").post(upload.single('file'),(req,res)=>{
res.send("File Uploaded");
res.end();
});



//get product image

productRoute.route("/getimage/:ppicname").get((req,res)=>{//sir ne get() method liya hai
    if(req.params.ppicname != undefined){
        res.sendFile("D:/MERN/ETenderProject/backend/server-app/product/productimages/"+req.params.ppicname);
    }else{
          console.log("Get product_Image Error ="+err);
    }
});


module.exports=productRoute;