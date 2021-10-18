const express = require('express');
const router = express.Router();
const Product = require('../models/product');
const path = require('path');
const multer = require('multer');
const upload = multer({dest:'./public/uploads/product'});

router.get('/',function(req,res,next){
    const list = Product.find({});
    res.render("partials/product/view",{list:list})
})
router.get('/add', function(req,res,next){
    res.render("partials/product/add");
})

router.post('/add', upload.single('image'), async function(req,res,next){
    if(!req.body)
    {
        res.status(400).send({message:"Content cannnot be empty"});
    }
    else
    {
        if (!req.file) {
            res.status(401).json({error: 'Please provide an image'});
        }
        req.body.image = req.file.path.split('\\').slice(1).join('\\');
        console.log(req.body.image);
        let product = new Product({
            name:req.body.name,
            productCode: req.body.productcode,
            quantity: req.body.quantity,
            price: req.body.price,
            images: [req.body.image],
            features:{
                width: req.body.width,
                height:req.body.height,
                weight: req.body.weight
            },
            description: req.body.description
        });
        product.save().then(result => {
            console.log(result);
            console.log(product);
            res.render("partials/product/add",{message:"Product added!"});
        }).catch(err=>{
            console.log(err);
            res.render("partials/product/add",{message:"Failed"})
        })
    }
})

router.get('/edit/:productcode',function(req,res,next){
    let productCode = req.params.productcode;
    let product = Product.findOne({productCode:productCode});
    res.render("partails/product/edit",{product:product});
})

router.post('/edit/:productcode',function(req,res,next){
    let productCode = req.params.productcode;
    
})
router.get('/detail')
module.exports = router;