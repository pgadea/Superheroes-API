const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const Superhero =  require('./models/Superhero')

const app = express()
let port = 3000

mongoose.connect('mongodb://localhost/superheroes')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))


// GET ALL Superheroes
app.get('/api', (req,res) => {
  Superhero.find((err, superheroes) => {
    if(err){
      res.json({message: err, data: null})
    }
    else{
      console.log("Now get all")
      res.json({message: `Successfully retrieved all heroes.`, data: superheroes})
    }
  })
  console.log("No, now me")
})

// POST NEW HERO
app.post('/api', (req, res) => {

  // CREATE a new hero via Superhero constructor
  let newHero = new Superhero()

  newHero.name = req.body.name
  newHero.superpower = req.body.superpower
  newHero.image = req.body.image

  newHero.save((err, newHero) => {
    if(err){
      res.json({message: err, data: null})
    }
    else{
      res.json({message: `Successfully created new hero: ${newHero.name}`, data: newHero})
    }
  })
})



// SERVER
app.listen(port, () => console.log(`Listen on port: ${port}`))
