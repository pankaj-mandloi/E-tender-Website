var mongoose = require('mongoose');
const formateDate = require('./date');
const Schema = mongoose.Schema;

var Tender = new Schema({
    tenderid:{type:Number},
    tenderbyid:{type:String},
    tendersdate:{type:String},
    tenderedate:{type:String},
    pcatgid:{type:Number},
    pid:{type:Number},
},
{
    collection:'tender'
}
);
module.exports=mongoose.model('Tender',Tender);