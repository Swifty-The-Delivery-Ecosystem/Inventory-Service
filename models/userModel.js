const mongoose = require('mongoose');


// TODO : Apply check on phone number validity.

const userSchema = mongoose.Schema({
  phone : {
    type: Number,
    required : [true, "Please enter a number"],
    unique: [true,"Email is already in use"]
  },
  primary_loc : {
    type: Number,
    required : [true, "Please enter a primary location"],
  },
  name : {
    type: String,
    required : [true, "Please enter an username"]
  }
},{timestamp:true});

module.exports = mongoose.model('User',userSchema);