const mongoose = require('mongoose')


const Qr = mongoose.model('Qr', {
    x_address: String,
    x_montant: String, 
});

module.exports = Qr;