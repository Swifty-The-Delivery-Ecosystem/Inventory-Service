const mongoose = require('mongoose');


// TODO : Apply check on rating cant be changed by restaurant

const MenuItemSchema = mongoose.Schema({
  _id : mongoose.Schema.Types.ObjectId,
  name : {
    type: String,
    required : [true, "Please enter an MenuItem name"]
  },
  restaurant_id:{
    type:mongoose.Schema.Types.ObjectId,
    required:true,
    ref: "Restaurant"
  },
  type : {
    type: Number,
    required : [true, "Please enter 0 for veg 1 for egg 2 for nonveg"],
  },
  price : {
    type: Number,
    required : [true, "Please enter a price"],
  },
  quantity : {
    type: Number,
    required : [true, "Please enter a  quantity"],
  },
  image_url : {
    type: String,
    required : [true, "Provide url for menu item image"]
  },
  description : {
    type: String,
  },
  rating : {
    type: Number,
  },
});

module.exports = mongoose.model('MenuItem',MenuItemSchema);