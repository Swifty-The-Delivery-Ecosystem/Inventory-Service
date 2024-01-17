const asyncHandler = require("express-async-handler");
const MenuItem = require("../models/menuItem.model");
const Vendor = require("../models/vendor.model");

//@desc Get All Vendors
//@route GET /api/customer/Vendors
//@access public

const getVendors = asyncHandler(async (req, res) => {
  try{
  const {primary_location, tag, is_veg, sort, page=1,pageSize = 10} = req.query;
  const filters = {};
  if(primary_location) {
    filters.location_served = {$in : [primary_location]}
  }
  if(tag){
    filters.tags = {$in : [tag]}
  }
  if(is_veg){
    filters.is_veg = true;
  }

  const sortOptions = {};
    if (sort) {
      const sortFields = sort.split(',');
      sortFields.forEach(field => {
        const order = field.endsWith('-') ? -1 : 1;
        const fieldName = field.replace(/[+-]/g, ''); 
        sortOptions[fieldName] = order;
      });
    }

  
  const Vendors = await Vendor
  .find(filters)
  .sort(sortOptions)
  .skip( (page-1)*pageSize)
  .limit(pageSize);
  return res.status(200).json(Vendors);
}
catch(err){
  return res.status(500).json({ error: 'Internal Server Error' });
}
});

//@desc Get All Menu Items of a Vendor
//@route GET /api/customer/menuitems
//@access public

const getMenuItems = asyncHandler(async (req, res) => {
  const Vendor_id = req.query.Vendor_id;
  const Vendor = await Vendor.findOne({ _id: Vendor_id });

  if (!Vendor) {
    return res.status(404).json({ message: "Vendor not found" });
  }
  res.status(200).json(Vendor.items);
});

//@desc Get Cart Value
//@route GET /api/customer/cartprice
//@access public

const getCartPrice = asyncHandler(async (req, res) => {
  const Vendor_id = req.query.VendorID;
  const cartItems = req.query.cartItems;

  const Vendor = await Vendor.findOne({ _id: Vendor_id });

  if (!Vendor) {
    return res.status(404).json({ message: "Vendor not found" });
  }

  const menuItems = Vendor.items;
  let totalPrice = 0;

  cartItems.forEach((cartItem) => {
    const menuItem = menuItems.find((item) => item._id.equals(cartItem));

    if (menuItem) {
      totalPrice += menuItem.price;
    }
  });

  res.status(200).json({ totalPrice });
});

module.exports = { getVendors, getCartPrice, getMenuItems };
