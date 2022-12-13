const { Schema, model } = require('mongoose');

const shopSchema = new Schema(
    {
        shopTitle: {
          type: String,
          required: true,
          unique: true,
        },
        shopDescription: {
            type: String,
            required: true,
        },
        shopLocation: {
            type: String,
            require: true,
        },
        profilePic: {
            type: String,
        },
        shopHero: {
            type: String,
            required: false
        },
    //   products: [
    //     {
    //       type: mongoose.Schema.Types.ObjectId,
    //       ref: 'Product'
    //     }
    //   ]
    }
)

module.exports = mongoose.model('Shop', shopSchema);