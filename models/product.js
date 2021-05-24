const mongoose = require('mongoose')
const Product = mongoose.model('products', {

    name: String,
    description: String,
    price: Number,
    publishedIn: Date,
    quantity: Number,
    image: String,
    categoryId: String,

})


module.exports = Product