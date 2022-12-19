const { Schema, model } = require('mongoose');

const productSchema = new Schema({
    shopID: {
        type: String,
    },
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
    category: {
        type: [String],
    }
});

const Product = model('Product', productSchema);

module.exports = Product;