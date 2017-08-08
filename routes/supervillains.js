const express = require('express')
const Router = express.Router()
const Supervillain = require('../models/Supervillain')

Router.route('/')
  .get((req,res) => {
    Supervillain.find((err, supervillains) => {
      if (err) res.json({message: err, data: null})
      res.json({message: `Successfully retrieved all villains!`, data: supervillains})
    })
  })
  .post((req,res) => {
    let newVillain = new Supervillain()
    newVillain.loadData(req.body)
    newVillain.setMetaDates()
    newVillain.save((err, newVillain) => {
      if(err) res.json({message: err, data: null})
      res.json({message: `Successfully created new villain: ${newVillain.name}`, data: newVillain})
    })
  })

  Router.route('/:villain_id')
    .get((req,res) => {
      Supervillain.findById(req.params.villain_id, (err, supervillain) => {
        if(err) res.json({message: err, data: null})
          res.json({message: `Successfully retrieved hero: ${supervillain.name}`, data: supervillain})
      })
    })
    .put((req,res) => {
      Supervillain.findById(req.params.villain_id, (err, supervillain) => {
        supervillain.loadData(req.body)
        supervillain.setMetaDates()
        supervillain.save((err, supervillain) => {
          if(err) res.json({message: err, data: null})
          res.json({message: `Successfully updated villain: ${supervillain.name}`, data: supervillain})
        })
      })
    })
    .delete((req,res) => {
      Supervillain.findById(req.params.villain_id, (err, supervillain) => {
        Supervillain.remove({_id: req.params.villain_id}, (err) => {
        if(err) res.json({message: err, data: null})
        res.json({message: `Supervillain: ${supervillain.name} successfully deleted!`, data: {}})
        })
      })
    })

  module.exports = Router;
