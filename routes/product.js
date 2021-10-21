const express = require('express');
const router = express.Router();
const Product = require('../models/product');
const path = require('path');
const multer = require('multer');
const upload = multer({dest:'./public/uploads/product'});

router.get('',function(req,res,next){
    let page = (typeof req.query.page != 'undefined')?req.query.page:1;
    console.log(page);
    let pageSize = 10;
    Product.find().skip(page*pageSize).limit(pageSize).exec((err,products)=>{
        Product.countDocuments((err,count)=>{   
            if(err) return next(err);
            res.render('partials/product/table',{
                products:products,
                current:page,
                pages:Math.ceil(count/pageSize)
            })
        })
    })
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
        let grouptype = req.body.grouptype.split('|');
        let colors = req.body.checklist;
        let product = new Product({
            name:req.body.productname,
            productCode: req.body.productcode,
            quantity: req.body.quantity,
            price: req.body.price,
            images: [req.body.image],
            features:{
                width: req.body.width,
                height:req.body.height,
                weight: req.body.weight
            },
            type:grouptype[1],
            group:grouptype[0],
            colors:colors,
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
router.get('/detail/:productCode', async function(req,res,next){
    let productCode = req.params.productCode;
    let product = await Product.findOne({productCode:productCode});
    res.render("partials/product/detail",{product:product});
})
router.get('/edit/:productCode', async function(req,res,next){
    let productCode = req.params.productCode;
    let product = Product.findOne({productCode:productCode});
    res.render("partials/product/edit",{product:product});
})

router.post('/edit/:productcode',async function(req,res,next){
    let productCode = req.params.productcode;
    
})
router.get('/detail')
module.exports = router;