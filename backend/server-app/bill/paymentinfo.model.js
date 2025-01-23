var mongoose=require('mongoose');
const Schema=mongoose.Schema;
var PaymentInfo=new Schema({
    billid:{type:Number},
    razorpayPaymentId:{type:String},
    razorpayOrderId:{type:String},
    razorpaySignature:{type:String},
    
},
{
    collection:'paymentInfo'
}
);
module.exports=mongoose.model('PaymentInfo',PaymentInfo);