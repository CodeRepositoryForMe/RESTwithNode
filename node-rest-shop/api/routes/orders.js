const express = require('express');
const router = express.Router();

router.get('/',(req, res, next)=>{
    res.status(200).json({
        message:'Order was created !!!!!'
    });
});

router.post('/',(req, res, next)=>{
    const orders={
        productID : req.body.productID,
        quantity : req.body.quantity
    };
    res.status(201).json({
        message:'Handles Post operstion for Order!!!!',
        order : orders
    });
});

router.get('/:orderId',(req, res, next)=>{
    const id = req.params.orderId;
    if(id === 'sepcial'){
        res.status(200).json({
            message:'Handle Get operation for Order!!!',
            Id : req.params.orderId
        });
    } else{
        res.status(200).json({
            message:'Handle Get operation for Order !!!',
            Id : 'noremal ID'
        });
    }
});

router.delete('/:orderId',(req, res, next) => {
    res.status(200).json({
        message:'Handle Delete Operation for Order!!!!',
        Id: req.params.orderId
    });
});

module.exports = router;