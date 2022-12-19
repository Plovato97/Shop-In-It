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
<<<<<<< HEAD
        type: Schema.Types.ObjectId,
        ref: 'Category',
        required: false
=======
        type: [String],
>>>>>>> develop
    }
});

const Product = model('Product', productSchema);

module.exports = Product;