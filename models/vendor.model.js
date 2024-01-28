const mongoose = require('mongoose');
const MenuItem = require("./menuItem.model");


const VendorSchema = mongoose.Schema({
  name : {
    type: String,
    required : [true, "Please enter an Restaurant name"]
  },
  image_url : {
    type: String,
    required : [true, "Provide url for restaurant image"]
  },
  phone : {
    type: Number,
    required : [true, "Please enter a valid phone number"]
  },
  owner : {
    type: String,
  
  },

  location : {
    type: Number,
    required : [true, "Please enter a primary location"],
  },
  location_served: {
    type: [Number],
    //TODO: Add default
  },  
  description : {
    type: String,
  },
  rating : {
    type: Number,
  },
  number_of_ratings : {
    type: Number,
  },
  tags: { 
    type: [String]
  },
  category: {
    type : String
  },
  status: {
    type: String
  },
  delivery_partners:{
    type : [mongoose.Schema.Types.ObjectId]
  }

},{timestamp:true});

module.exports = mongoose.model('Vendor',VendorSchema);