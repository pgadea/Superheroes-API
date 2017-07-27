const mongoose = require('mongoose')

const SuperheroSchema = new mongoose.Schema({
  name: String,
  superpower: String,
  image: String,
})

module.exports = mongoose.model('Superhero', SuperheroSchema);
