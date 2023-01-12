const express = require("express")
const app = express()
const mongoose = require('mongoose');
const morgan = require('morgan')
app.use(morgan('dev'))
const bodyparser = require('body-parser')
app.use(bodyparser.urlencoded({ extended: true }))
app.use(bodyparser.json())
const productroutes = require('./routes/productroute')
app.use("/api", productroutes)

const order = require('./routes/orderroute')
app.use('/api', order)

const userroute = require("./routes/userroute")
app.use("/api", userroute)

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*')
    res.header(
        'Access-Control-Allow-Headers', 
        'Origin, X-Requested-With, Content-Tyoe, Accept, Authorization'
        )
    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET')
        return res.status(200).json({})
    }
    next()
})


mongoose.connect('mongodb://0.0.0.0:27017/Danish').then(() => {
    console.log("connection is succesful")
}).catch((e) => {
    console.log("No connection");
    console.log(e);
})

app.use((req, res, next) => {
    const error = new Error('Not found')
    error.status = 404
    next(error)
})

app.use((error, req, res, next) => {
    res.status(error.status || 500)
    res.json({
        error: {
            message: error.message
        }
    })
})


module.exports = app