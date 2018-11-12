const express = require('express'); //
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

//for parsing the body content => body-Parser
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

mongoose.connect('mongodb://localhost/customer',{useNewUrlParser:true});

/* mongo connection string without mongoose
var MongoClient = require('mongodb').MongoClient, Server = require('mongodb').Server;
var URL = "mongodb://localhost/customer";
MongoClient.connect(URL, {useNewUrlParser:true}, function(err, db){
    console.log("Connected to server ");
    db.close();
});
*/

//for log requests => morgan
app.use(morgan('dev'));

//to manage CROS issues => to allow specific domains / specific methods
app.use((req, res, next)=>{
    res.header("Access-Control-Allow-Origin","*");
    res.header("Access-Control-Allow-Headers", 
    "Oringin, X-Requested-With, Content-Type, Accept, Authorization")
    if(req.method ==='OPTIONS'){
        res.header('Access-Control-Allow-Methods','PUT, POST, PATCH, DELETE');
        return res.status(200).json({});
    } 
    //return if there is no any options in req
    next();
});

//to manage request to products 
const productRoute = require('./api/routes/products');
app.use('/products',productRoute);

//to manage request to orders
const orderRoute = require('./api/routes/orders');
app.use('/orders',orderRoute);

//Route which other than given handler
app.use((req, res, next)=>{
    const error = new Error('Not Found');
    error.status= 404;
    next(error);
});

app.use((error, req, res, next)=>{
    res.status(error.status || 500);
    res.json({
        error:{
            message: error.message
        }
    });
});

/*
app.use((req, res, next) => {
    res.status(200).json({
        messgae: "It works !!!!"
    });
}); // middleware
*/
module.exports = app;