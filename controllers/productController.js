//import librairies
const fs = require('fs');
const express = require('express');
const multer = require('multer');
const path = require('path');
//create app
const app = express();
// stockage 
const stockage = multer.diskStorage({
    destination : './assets.products',
    filename : function(req,file,cb){
        cb(null , Data.now()+path.extname(file.originalname))
    }
})
// check file 
function check(file,cb){
    const types = /jpeg|jpg|png|gif/;
    const verifExt = types.test(path.extname(fie.originalname).toLowerCase())
    const verifMime = types.test(file.mimetype)
    if(verifExt && verifMime){
        return cb(null,true)
    }else {
        cb ('invalid file type')
    }
}
// upload
const upload = multer({
    storage : stockage ,
    limits : {fileSize : 1000000},
    fileFilter : function (req,file,cb){
        check(file,cb)
    }
})
// import models
const Product = require('./../models/product');
const { createBrotliCompress } = require('zlib');
// API for add product
app.post('/add',upload.single(''), async (req, res) => {

    try {
        let data = req.body


        let product = new Product({
            name: data.name,
            price: data.price,
            imageUrl: data.imageUrl,
            description: data.description,
            categoryId: data.categoryId
        })

        let productFromDb = await product.save();
        res.status(201).send({ message: 'product added succefuly !' })

    } catch (error) {
        res.status(400).send({ message: 'add failed! ' })
    }

})
//API for get all products
app.get('/getall', async (req, res) => {

    try {

        let product = await Product.find()

        res.status(200).send(product)

    } catch (error) {
        res.status(400).send({ message: 'API failed ! ', error })
    }

})

//API for get product par id
app.get('/getby/:id', async (req, res) => {

    try {

        let id = req.params.id;
        let product = await Product.findOne({ _id: id });

        if (!product) {
            res.status(404).send({ mesage: "product nor found" })
        }
        else {
            res.status(200).send(product)
        }

    } catch (error) {
        res.status(400).send({ message: 'API failed ! ', error })
    }

})

//API for update product par id 
app.put('/update/:id', async (req, res) => {
    try {
        let id = req.params.id;
        let data = req.body;
        let updatedProduct = await Product.findOneAndUpdate({ _id: id }, data);
        if (!updatedProduct) {
            res.status(404).send({ mesage: "product nor found" })
        }
        else {
            res.status(200).send({ message: "product updated" })
        }
    }
    catch (error) {
        res.status(400).send({ message: 'update failed ! ' })
    }

})

//API for delet product par id 
app.delete('/delete/:id', async (req, res) => {

    try {

        let id = req.params.id
        let deletedProduct = await Product.findOneAndDelete({ _id: id })

        if (!deletedProduct) {
            res.status(404).send({ mesage: "product nor found" })
        }
        else {
            res.status(200).send({ mesage: "deleted succefuly" })
        }

    } catch {
        res.status(400).send({ message: 'delete failed ! ' })
    }

})

module.exports = app