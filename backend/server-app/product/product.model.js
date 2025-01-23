var mongoose=require('mongoose');
const Schema=mongoose.Schema;

var Product=new Schema({
    pid:{type:Number},
    pname:{type:String},
    pdesc:{type:String},
    pcatgid:{type:Number},
    ppicname:{type:String}
},
{
    collection:'product'
});
module.exports=mongoose.model('Product',Product);