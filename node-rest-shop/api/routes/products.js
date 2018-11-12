const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Product = require('../models/product.js');
// Product routs
//get method 2 params : URL and Handler
router.get('/',(req, res, next) => {
    Product
    .find()
    .exec()
    .then(doc =>{
        console.log(doc);
        res.status(200).json(doc)
    }).catch(err =>{
        console.log(err);
        res.status(500).json({
            message:'faied to get productd'
        })
    });
    /*res.status(200).json({
        message:'Handles Get request to /products !!!'
    });*/
});

router.post('/',(req, res, next) =>{
    console.log(req.params);
    /*const product={
        name : req.body.name,
        price : req.body.price
    };*/
    const product = new Product({
        _id : new mongoose.Types.ObjectId(),
        name: req.body.name,
        price: req.body.price 
    });
    product
    .save()
    .then(result => {
        console.log(result);
    })
    .catch(err => console.log(err));
    console.log(product);
    res.status(201).json({
        message:'Handles Post request to /products !!!!11',
        product: product
    });
});

router.get('/:productId',(req,res,next)=>{
    console.log(req.param("productId"));
    const id = req.param("productId");
   Product
   .findById(id)
   .exec()
   .then(doc => {
       console.log(doc);
       if(doc){
        res.status(200).json(doc);
       } 
       else{
           res.status(404).json({
               message: 'Data not fonud for selected ID'
           })
       }
       
   })
   .catch(err=>{
       console.log(err);
       res.status(500).json({message :'Invalid product'})
   });
    /*res.status(200).json({
        message:'Handle Get operation for Product!!!!!',
        id: req.params.productId
    });*/
});

router.patch('/:productId',(req, res, next)=>{
    res.status(200).json({
       message: 'Handle Patch Opetaion for Product !!!!',
       id: req.params.productId  
    });
});

module.exports = router;