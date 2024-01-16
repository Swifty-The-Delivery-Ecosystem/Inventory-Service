const mongoose = require('mongoose');
const MenuItem = require("./menuItem.model");

const MenuSchema = mongoose.Schema({
  items : [{
    type: MenuItem.Schema
  }],
  vendor_id : {
    type : mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Vendor"
  }
})

module.exports = mongoose.model('Menu',MenuSchema )