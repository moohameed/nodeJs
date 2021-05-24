const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://mohamed:basma123@cluster0.fr89d.mongodb.net/ecom-formalab?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false
})
    .then(() => {
        console.log("we are conneccted to database !")
    })
    .catch(() => {
        console.log("connection ERROR ! ")
    })


module.exports = mongoose