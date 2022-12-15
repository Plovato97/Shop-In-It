const db = require('./connection');
const { User, Product, Shop } = require('../models');

db.once('open', async () => {
    await Shop.deleteMany();

    const Shops = await Shop.insertMany([
        {
            shopTitle: 'looney looney',
            shopDescription: 'the looniest of shops',
            shopLocation: 'located at loony island, across from aw shucks river.',
        },
        {
            shopTitle: 'Hectors Shop',
            shopDescription: 'localy owned shop by founder Hector. This store has been opened since 2000, and is aware of its popularity. Known to sell novelty items and nicknaks along with an array of musical instruments.',
            shopLocation: 'This shop is something you can not miss, located in North Carolina, the shop has a distinct mustache on the building indistinguisable from the others around town.'
        },
        {
            shopTitle: 'RedRoo',
            shopDescription: `Do you know the saying 'feeling blue?' well this store will have you feeling red with its amazing products! Come see the mystical magical selection of red!`,
            shopLocation: "this shop is located in red town road! all of the visitors hear are distinct in trying to get grandma her groceries. Always wearing a red cloak and theres always a big wolf not far behind..."
        }
    ]);

    console.log('Shops Seeded!');

    await Product.deleteMany();

    const products = Product.insertMany([
        {
            
        }
    ])
})