require("dotenv").config();
const express = require("express");
const Razorpay = require("razorpay");
const router = express.Router();
var PaymentInfo=require("./bill/paymentinfo.model");

router.post("/orders/:qamount", async (req, res) => {
    try {
        //console.log("qamount"+req.params.qamount);
        const instance = new Razorpay({
            key_id: process.env.RAZORPAY_KEY_ID,
            key_secret: process.env.RAZORPAY_SECRET,
        });

        const options = {
            
            amount: req.params.qamount, // amount in smallest currency unit
            currency: "INR",
            receipt: "receipt_order_74394",
        };

        const order = await instance.orders.create(options);
        //console.log("order"+order);
        if (!order) return res.status(500).send("Some error occured");

        res.json(order);
        
    } catch (error) {
        res.status(500).send(error);
    }
});

//success page
router.post("/success",async (req,res)=>{
    var paymentinfo = new PaymentInfo(req.body);
    //var razorpay = new Razorpay(key_id);
    paymentinfo.save().then(paymentinfo=>{

        console.log("Razorpay payment :"+paymentinfo);
        
    res.send("Payment Successfully Done :"+paymentinfo.billid);
    res.end();
}).catch((err)=>{
    res.status(400).send("Unable to save to database");
});
});
module.exports = router;