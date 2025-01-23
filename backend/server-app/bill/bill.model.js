var mongoose=require('mongoose');
const Schema=mongoose.Schema;
var Bill=new Schema({
    billid:{type:Number},
    billdate:{type:String},
    suserid:{type:String},
    qid:{type:Number},
    qamount:{type:Number}
},
{
    collection:'bill'
}
);
module.exports=mongoose.model('Bill',Bill);