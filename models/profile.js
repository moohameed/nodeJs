const mongoose = require('mongoose')


const Profile = mongoose.model('Profile', {

    username: {
        type: String,
        unique: true
    },
    password: String,
    role: { type: String, default: "user" },
    firstname: String,
    lastname: String,
    dateNaissance: Date, // not required as admin 
    city: String, // not required as admin 
    codePostal: String, // not required as admin 
    email: String, // not required as admin 
    address: String, // not required as admin  
    phone: String, // not required as admin  
    wallet: Number  // not required as admin 
});

module.exports = Profile;
