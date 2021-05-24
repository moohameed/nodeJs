const mongoose = require('mongoose')
const Category = mongoose.model ('categorys' , {

   name: {
        type: String,
        required: true,
        unique : true
    },
    description: {
        type : String,

    },
    type: String 
})


module.exports = Category