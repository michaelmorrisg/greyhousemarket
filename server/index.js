const express = require('express')
const bodyParser = require('body-parser')
const massive = require('massive')
const session = require('express-session')
// const bcrypt = require('bcryptjs')
require('dotenv').config()

const controller = require('./controller')
const port = process.env.SERVER_PORT
const app = express()

massive(process.env.CONNECTION_STRING).then(db=>{
    app.set('db',db)
    app.listen(port, ()=>{
        console.log(`Listening on port ${port}`)
    })

})

/////Middleware//////

app.use(bodyParser.json())

app.use(session({
    secret: process.env.SESSION_SECRET,
    saveUninitialized: true,
    resave: false
}))


/////Endpoints///////
app.post('/api/newuser', controller.addUser)
app.post('/api/addguest', controller.addGuest)
app.get('/api/userinfo/:email/:password', controller.getUser)
app.get('/api/products/:category', controller.getProducts)
app.get('/api/getproduct/:id', controller.getProduct)
app.post('/api/addproduct', controller.addProduct)
app.get('/api/getcart', controller.getCart)
app.delete('/api/removefromcart/:id', controller.deleteProduct)
app.get('/api/refreshuser', controller.refreshUser)
app.get('/api/totalcart', controller.totalCart)
app.put('/api/updatequantity/:id/:quantity', controller.updateQuantity)


