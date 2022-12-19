const mongoose = require('mongoose');

const { Schema } = mongoose;

const orderSchema = new Schema({
<<<<<<< HEAD
  purchaseDate: {
    type: Date,
    default: Date.now
  },
  products: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Product'
    }
  ]
=======
    datePurchased: {
        type: Date,
        default: Date.now
    },
    productId: {
        type: String,
        required: true
    },
    products: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Product'
        }
    ]
>>>>>>> a45dd7d07848180152f1892a662e03e1c459b348
});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
