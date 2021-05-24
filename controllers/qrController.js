//import librairies
const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
//import models
const Qr = require('./../models/qrcode');

//create app
const app = express();

app.get('/', (req, res) => {
    res.status(200).send("welcome to the qr ");
})

// API for scan
app.post('/scan', async (req, res) => {

    try {
        let data = req.body
        
        let qr = new Qr(data)

        let userFromDb = await qr.save();

        res.status(201).send({ message: 'scanned succefuly !' })

    } catch (error) {
        res.status(400).send({  message: 'scanned succefuly !'})
    }

})

module.exports = app