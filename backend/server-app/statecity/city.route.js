const express=require("express");
const cityRoute=express.Router();
var City=require('./city.model');

//save city
cityRoute.route('/save').post((req,res)=>{
    let city=new City(req.body);
    city.save().then(city=>{
        res.send("City Saved")
        res.end()
    }).catch(err=>{
        res.send("Unable to save to database");
    })
})
//get city by state id
cityRoute.route("/getcitybystid/:stid").get((req,res)=>{
    City.find({"stid":req.params.stid}).then((city)=>{
        res.send(city);
        res.end();
    }).catch((err)=>{
        res.send(err);
        res.end();
    })
})

//show all Cities
cityRoute.route('/show').get((req,res)=>{
    City.find().then((city)=>{
        res.send(city);
        res.end();

    }).catch((err)=>{
        res.send(err);
        res.end();
    })

})
module.exports=cityRoute;