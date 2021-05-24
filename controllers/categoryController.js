//import librairies
const express = require ('express') ;
//import models
const User = require('./../models/category');
//create app
const app = express() ; 
const Category = require ('./../models/category') ;

app.post('/add', async (req, res) => {

    try {
        let data = req.body
        let category = new Category({
            name : data.name 
        })

        let categoryFromDb = await category.save();
        res.status(201).send({ message: 'category added succefuly !' })

    } catch (error) {
        res.status(400).send({ message: 'add failed ! ', error })
    }

})
//API for get all cateegories
app.get('/getall', async (req, res) => {

    try {

        let category = await Category.find()

        res.status(200).send(category)

    } catch (error) {
        res.status(400).send({ message: 'API failed ! ', error })
    }

})
//API for get category par id
app.get('/getby/:id', async (req, res) => {

    try {

        let id = req.params.id;
        let category = await Category.findOne({ _id: id });

        if (!category) {
            res.status(404).send({ mesage: "category nor found" })
        }
        else {
            res.status(200).send(category)
        }

    } catch (error) {
        res.status(400).send({ message: 'API failed ! ', error })
    }

})

//API for update category 
app.put('/update/:id', async (req, res) => {
    try {
        let id = req.params.id;
        let data = req.body;
        let updatedCatgory = await Category.findOneAndUpdate({ _id: id }, data);
        if (!updatedCatgory) {
            res.status(404).send({ mesage: "category nor found" })
        }
        else {
            res.status(200).send({ message: "category updated" })
        }
    }
    catch (error) {
        res.status(400).send({ message: 'API failed ! ', error })
    }

})

//API for delet category par id 
app.delete('/delete/:id', async (req, res) => {

    try {

        let id = req.params.id
        let deletedCategory = await Category.findOneAndDelete({ _id: id })

        if (!deletedCategory) {
            res.status(404).send({ mesage: "category nor found" })
        }
        else {
            res.status(200).send({ mesage: "deleted succefuly" })
        }

    } catch {
        res.status(400).send({ message: 'API failed ! ', error })
    }

})


module.exports =app 