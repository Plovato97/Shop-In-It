const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const productSchema = new Schema({
    productName: {
        type: String,
        required: true,
        trim: true
    },
    productDescription: {
        type: String
    },
    productImage: {
        type: String
    },
    price: {
        type: Number,
        required: true,
        min: 0.99
    },
});

const Product = model('Product', productSchema);

module.exports = Product;