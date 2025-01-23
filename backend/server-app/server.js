var express = require('express');
var app = express();
var bodyparser = require('body-parser');
var cors = require('cors');
const PORT = 9190;
var mongoose = require('mongoose');
var stateRoute = require('./statecity/state.route');
var cityRoute = require('./statecity/city.route');
var productCatgRoute = require('./product/productcatg.route');
var productRoute = require('./product/product.route');
var supplierRoute = require('./supplier/supplier.route');
var companyRoute = require('./company/company.route');
var tenderRoute = require('./tender/tender.route');
var quotationRoute=require('./Quotation/quotation.route');
var billRoute=require('./bill/bill.route');
var payment=require('./payment');
var config = require('./DB');

//skip 10 lines

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended:true}));
app.use(cors());
app.use('/state',stateRoute);
app.use('/city',cityRoute);
app.use('/productcatg',productCatgRoute);
app.use('/product',productRoute);
app.use('/supplier',supplierRoute);
app.use('/company',companyRoute);
app.use('/tender',tenderRoute);
app.use('/quotation',quotationRoute);
app.use('/bill',billRoute);
app.use('/payment',payment);

mongoose.connect(config.URL,{ useNewUrlParser:true}).then(()=>{
console.log('Database is connected '+config.URL)},
err=>{console.log('can not connect to database '+err)
});

//skip 10 lines
app.listen(PORT,()=>{
console.log('server is running on port '+PORT);
});
