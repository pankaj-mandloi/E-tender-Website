var mongoose = require('mongoose');
const Schema = mongoose.Schema;

var Supplier = new Schema({
    suserid:{type:String},
    suserpass:{type:String},
    sfullname:{type:String},
    stid:{type:Number},
    ctid:{type:Number},
    saddress:{type:String},
    scontact:{type:String},
    semail:{type:String},
    spicname:{type:String},
    spcatgid:{type:Number},
    sranking:{type:Number}
},{
    collection:'supplier'
}
);
module.exports=mongoose.model('Supplier',Supplier);