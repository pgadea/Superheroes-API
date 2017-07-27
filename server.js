const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const Superhero =  require('./models/Superhero')

const app = express()
let port = 3000

mongoose.connect('mongodb://localhost/superheroes')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))


// GET SINGLE HERO
app.get('/api/:hero_id', (req,res) => {
  Superhero.findById(req.params.hero_id, (err, superhero) => {
    if(err){
      res.json({message: err, data: null})
    }
    else{
      res.json({message: `Successfully retrieved hero: ${superhero.name}`, data: superhero})
    }
  })
})

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

// PUT SINGLE HERO
app.put('/api/:hero_id', (req,res) => {

  // FIND our hero to update
  Superhero.findById(req.params.hero_id, (err, superhero) => {

    // If new data then change value, else keep the same
    superhero.name = (req.body.name) ? req.body.name : superhero.name
    superhero.superpower = (req.body.superhero) ? req.body.superhero : superhero.superpower
    superhero.image = (req.body.image) ? req.body.image : superhero.image

    superhero.save((err, superhero) => {
      if(err){
        res.json({message: `Successfully updated hero: ${superhero.name}`, data: superhero})
      }
    })
  })
})

// DELETE SINGLE RECORD
app.delete('/api/:hero_id', (req,res) => {

  // Find hero to delete via search object
  Superhero.remove({_id: req.params.hero_id}, (err) => {
    if(err){
      res.send({message: err, data: null})
    }
    else{
      res.send({message: `Superhero successfully deleted!`, data: {}})
    }
  })
})

// SERVER
app.listen(port, () => console.log(`Listen on port: ${port}`))
