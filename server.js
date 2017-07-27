const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const app = express()
let port = 3000

mongoose.connect('mongodb://localhost/superheroes')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))





// SERVER
app.listen(port, () => console.log(`Listen on port: ${port}`))
