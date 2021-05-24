//imports 

const express = require ('express') ;
var cors = require('cors')
// DB
require('./db/config')
// controllers
const  userController = require('./controllers/userController') ;
const productController = require('./controllers/productController') ;
const categoryController = require('./controllers/categoryController') ;
const orderController = require('./controllers/orderController') ;
//initial Config
const app = express() ; 
app.use(express.json())
app.use(cors()) 
app.use(express.urlencoded({
    extended: true 
}))
app.use(express.static('./assets/users'))
app.use(express.static('./assets/products'))

app.use('/user',userController)
app.use('/product',productController)
app.use('/order',orderController)
app.use('/category',categoryController)


//API-exemple
app.get('/',(req,res)=>{
    res.status(200).send("welcome to the server ") ;
})

app.listen (3000, () =>{
    console.log('server started') ;
})