const express= require('express')
const productCatgRoute=express.Router();
var ProductCatg=require('./productcatg.model')

//save All Products in database
productCatgRoute.route('/save').post((req,res)=>{
    let productCatg=new ProductCatg(req.body);
    productCatg.save().then(productCatg=>{
        res.send("Product Save");
        res.end();
    }).catch(err=>{
        res.send("Unable to save to database");
        res.end();
    })
})
//show all Products
productCatgRoute.route('/show').get((req,res)=>{
    ProductCatg.find().then((productCatg)=>{
        res.send(productCatg);
        res.end();

    }).catch((err)=>{
        res.send(err);
        res.end();
    })
})
module.exports=productCatgRoute;