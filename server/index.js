const express = require('express')
const bodyParser = require('body-parser')
const massive = require('massive')
const session = require('express-session')
const nodemailer = require('nodemailer')
require('dotenv').config()
cors = require('cors')


const keyPublishable = process.env.PUBLISHABLE_KEY
const keySecret = process.env.SECRET_KEY

const controller = require('./controller')
const port = process.env.SERVER_PORT
const app = express()
const stripe = require('stripe')(keySecret)

app.set("view engine", "pug")

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

app.use(cors())



////NodeMailer/////
var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'michaelmorrisg@gmail.com',
        pass: 'Erlervlerv1'
    }
})

var mailOptions = {
    from: 'michaelmorrisg@gmail.com',
    to: 'michaelmorrisg@gmail.com',
    subject: 'Hey there!',
    text: 'Well how crazy'
}
transporter.sendMail(mailOptions, function(error, info){
    if (error){
        console.log(error)
    } else {
        console.log('Email sent: ' + info.response)
    }
})


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
app.delete('/api/clearcart', controller.clearCart)

//Payment//
app.post('/api/payment', function(req,res,next){
    const amountArray = req.body.amount.toString().split('')
    const pennies = []
    for (var i = 0; i<amountArray.length; i++){
        if(amountArray[i]==='.'){
            if (typeof amountArray[i + 1]==='string'){
                pennies.push(amountArray[i + 1])
            } else {
                pennies.push('0')
            }
            if (typeof amountArray[i + 2]==='string'){
                pennies.push(amountArray[i+2])
            } else {
                pennies.push('0')
            }
            break;
        } else {
            pennies.push(amountArray[i])
        }
    }
    const convertedAmt = parseInt(pennies.join(''))

    const charge = stripe.charges.create({
        amount: convertedAmt,
        currency: 'usd',
        source: req.body.token.id,
        description: "Test Charge"
    }, function(err, charge){
        if (err) {return res.sendStatus(500)}
        else{
        return res.sendStatus(200)}
    })
})


