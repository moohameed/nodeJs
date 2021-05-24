const mongoose = require('mongoose')
const Order = mongoose.model ('Orders' , {
    clientId : {
        type : String ,
        require : true
    },
    products : [mongoose.Schema.Types.Mixed] , 
    createDat :{
        type : Date ,
        default : new Date()
    },
    state : {
        type : Boolean ,
        default : false
    }
})


module.exports = Order