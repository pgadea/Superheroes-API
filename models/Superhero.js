const mongoose = require('mongoose')

const SuperheroSchema = new mongoose.Schema({
  name: {type: String, required: true},
  superpower: {type: String, required: true},
  image: String,
  created: {type: Date, required: true},
  modified: {type: Date, required: true}
})

SuperheroSchema.methods.loadData = function(dataIn){
  this.name = (dataIn.name) ? dataIn.name : this.name;
  this.superpower = (dataIn.superpower) ? dataIn.superpower : this.superpower
  this.image = (dataIn.image) ? dataIn.image : this.image
}

SuperheroSchema.methods.setMetaDates = function(){
  let postDate = new Date()

  this.created = (!this.created) ? postDate : this.created;
  this.modified = postDate;
}

module.exports = mongoose.model('Superhero', SuperheroSchema);
