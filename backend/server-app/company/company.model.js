var mongoose = require('mongoose');
const Schema = mongoose.Schema;

var Company = new Schema({
    cuserid:{type:String},
    cuserpass:{type:String},
    companyname:{type:String},
    stid:{type:Number},
    ctid:{type:Number},
    caddress:{type:String},
    ccontact:{type:String},
    cemail:{type:String}
},{
    collection:'company'
}
);
module.exports=mongoose.model('Company',Company);