const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
    productCode: String,
    quantity: Number,
    price: Number,
    name:String,
    features: Object({
        width:Number,
        height:Number,
        weight:Number,
    }),
    images: Array,
    description:String
})

module.exports = mongoose.model('product',ProductSchema)