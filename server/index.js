const express = require('express')
const bodyParser = require('body-parser')
const massive = require('massive')
const session = require('express-session')
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


