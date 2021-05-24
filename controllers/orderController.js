const express = require('express');
const app = express();
const Order = require('./../models/order');
app.get('/', (req, res) => {
    res.status(200).send("welcome to the order controller ");
})
//API for add order
app.post('/add', async (req, res) => {

    try {
        let data = req.body


        let order = new Order({
            clientId: data.clientId,
            products: data.products,
            createDat: data.createDat,

        })

        let orderFromDb = await order.save();
        res.status(201).send({ message: 'order added succefuly !' })

    } catch (error) {
        res.status(400).send({ message: 'error commande  ' })
    }

})
//API for get all orders
app.get('/getall', async (req, res) => {

    try {

        let order = await Order.find()

        res.status(200).send(order)

    } catch (error) {
        res.status(400).send({ message: 'API failed ! ', error })
    }

})

//API for get order par id
app.get('/getby/:id', async (req, res) => {

    try {

        let id = req.params.id;
        let order = await Order.findOne({ _id: id });

        if (!order) {
            res.status(404).send({ mesage: "order not found" })
        }
        else {
            res.status(200).send(order)
        }

    } catch (error) {
        res.status(400).send({ message: 'API failed ! ', error })
    }

})
//API for update orders 
app.put('/update/:id', async (req, res) => {
    try {
        let id = req.params.id;
        let data = req.body;
        let updatedOrder = await Order.findOneAndUpdate({ _id: id }, data);
        if (!updatedOrder) {
            res.status(404).send({ mesage: "order nor found" })
        }
        else {
            res.status(200).send({ message: "order updated" })
        }
    }
    catch (error) {
        res.status(400).send({ message: 'API failed ! ', error })
    }

})


//API for delet order par id 
app.delete('/delete/:id', async (req, res) => {

    try {

        let id = req.params.id
        let deletedOrder = await Order.findOneAndDelete({ _id: id })

        if (!deletedOrder) {
            res.status(404).send({ mesage: "order nor found" })
        }
        else {
            res.status(200).send({ mesage: "deleted succefuly" })
        }

    } catch {
        res.status(400).send({ message: 'API failed ! ', error })
    }

})



module.exports = app