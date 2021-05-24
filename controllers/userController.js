//import librairies
const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
//import models
const User = require('./../models/user');
const isAdmin = require('./../middleware/auth');

const Profile = require('./../models/profile');

//create app
const app = express();


app.get('/', (req, res) => {
    res.status(200).send("welcome to the user ");
})

// API for signup
app.post('/signup', async (req, res) => {

    try {
        let data = req.body
        data.password = bcrypt.hashSync(data.password, bcrypt.genSaltSync(10));
        let user = new User(data)

        let userFromDb = await user.save();

        res.status(201).send({ message: 'user registred succefuly !' })

    } catch (error) {
        res.status(400).send({ message: 'sign up failed ! '})
    }
})

//API for signin
app.post('/signin', async (req, res) => {
    try {
        let data = req.body
        let userFromDb = await User.findOne({ username: data.username });
        if (!userFromDb) {
            res.status(404).send({ message: "error" })
        } else {
            let compare = bcrypt.compareSync(data.password, userFromDb.password);
            if (!compare) {
                res.status(404).send({ message: "user not found" })
            } else {
                //token generation
                let token = jwt.sign({ id: userFromDb._id, role: userFromDb.role }, "SECRET")
                res.status(200).send({ token });
            }
        }
    } catch (error) {
        res.status(400).send({ message: "error" })
    }

})

//API for get all users
app.get('/getall', async (req, res) => {

    try {

        let users = await User.find()

        res.status(200).send(users)

    } catch (error) {
        res.status(400).send({ message: 'API failed ! ', error })
    }

})

//API for get user par id
app.get('/getby/:id', async (req, res) => {

    try {

        let id = req.params.id;
        let user = await User.findOne({ _id: id });

        if (!user) {
            res.status(404).send({ mesage: "user nor found" })
        }
        else {
            res.status(200).send(user)
        }

    } catch (error) {
        res.status(400).send({ message: 'API failed ! ', error })
    }

})

//API for update user par id 
app.put('/update/:id', async (req, res) => {
    try {
        let id = req.params.id;
        let data = req.body;
        let updatedUser = await User.findOneAndUpdate({ _id: id }, data);
        if (!updatedUser) {
            res.status(404).send({ mesage: "user nor found" })
        }
        else {
            res.status(200).send({ message: "User updated" })
        }
    }
    catch (error) {
        res.status(400).send({ message: 'API failed ! ', error })
    }

})

//API for delet user par id 
app.delete('/delete/:id', async (req, res) => {

    try {

        let id = req.params.id
        let deletedUser = await User.findOneAndDelete({ _id: id })

        if (!deletedUser) {
            res.status(404).send({ mesage: "user not found" })
        }
        else {
            res.status(200).send({ mesage: "deleted succefuly" })
        }

    } catch {
        res.status(400).send({ message: 'API failed ! ', error })
    }

})

module.exports = app