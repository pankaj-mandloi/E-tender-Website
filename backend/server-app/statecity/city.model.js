var mongoose= require('mongoose')
const Schema = mongoose.Schema;

var City=new Schema({
    ctid:{type:Number},
    ctname:{type:String},
    stid:{type:Number}

},
{
    collection:'city'
});
module.exports=mongoose.model('City',City);
