var mongoose = require('mongoose');
//const formateDate = require('./date');
const Schema = mongoose.Schema;

var Quotation = new Schema({
    qid:{type:Number},
    tid:{type:Number},
    qbyid:{type:String},
    qsubdate:{type:String}, 
    qamount:{type:Number},
    qstatus:{type:String},
    qstate:{type:String}
},
{
    collection:'quotation'
}
);
module.exports=mongoose.model('Quotation',Quotation);