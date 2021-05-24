const mongoose = require('mongoose')


const User = mongoose.model('User', {

    username: {
        type: String,
        unique: true
    },
    password: String,
    role: { type: String, default: "user" },
    dateNaissance: Date, // not required as admin 
    city: String, // not required as admin 
    codePostal: String, // not required as admin 
    email: String, // not required as admin 
    address: String, // not required as admin  
    phone: String, // not required as admin  
    
});

module.exports = User;


