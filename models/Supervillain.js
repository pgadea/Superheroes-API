const mongoose = require('mongoose')

const SupervillainSchema = new mongoose.Schema({
  name: {type: String, required: true},
  superpower: {type: String, required: true},
  image: {type: String, required: true},
  created: {type: Date, required: true},
  modified: {type: Date, required: true}
})

SupervillainSchema.methods.loadData = function(dataIn){
  this.name = dataIn.name || this.name;
  this.superpower = dataIn.superpower || this.superpower;
  this.image = dataIn.image || this.image;
}

SupervillainSchema.methods.setMetaDates = function(){
  const postDate = new Date()

  this.created = this.created || postDate;
  this.modified = postDate;
}

module.exports = mongoose.model('Supervillain', SupervillainSchema);
