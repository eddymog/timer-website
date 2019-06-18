// grab the things we need
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// create a schema
const timerSchema = new Schema({
  time: Number,
  myId: String
});

// custom method to add string to end of name
// you can create more important methods like name validations or formatting
// you can also do queries and find similar users 
timerSchema.methods.dudify = function() {
    // add some stuff to the users name
    this.name = this.name + '-dude'; 
  
    return this.name;
  };

timerSchema.methods.updateTimer = (newTime) => {
  console.log(newTime + "!!!");
  
  return this.time;
};

// the schema is useless so far
// we need to create a model using it
const Timer = mongoose.model('timer', timerSchema);

// make this available to our users in our Node applications
module.exports = Timer;