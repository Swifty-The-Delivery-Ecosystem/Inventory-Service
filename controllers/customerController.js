const asyncHandler = require('express-async-handler');
const User = require("../models/userModel");
const MenuItem = require("../models/menuItemModel");
const Restaurant = require("../models/restaurantModel");



//@desc Get All Restaurants
//@route GET /api/customer/restaurants
//@access public


const getRestaurants = asyncHandler( async (req,res)=>{
  const primaryloc = req.body.location;
  const restaurants = await Restaurant.find({location: primaryloc});
  res.status(200).json(restaurants);
});

//@desc Get All Menu Items of a Restaurant
//@route GET /api/customer/menuitems
//@access public


const getMenuItems = asyncHandler( async (req,res)=>{
  const restaurant_id = req.body.restaurantID;
  const restaurant = await Restaurant.find({_id : restaurant_id});
  res.status(200).json(restaurant.items);
});


//@desc Get Cart Value
//@route GET /api/customer/cartprice
//@access public


const getCartPrice = asyncHandler( async (req,res)=>{
  const {restaurant_id, cartItems} = req.body;
  const restaurant = await Restaurant.find({_id : restaurant_id});
  const menuItems = restaurant.items;
  let totalPrice = 0;

  cartItems.forEach((cartItem) => {
    const menuItem = menuItems.find(item => item._id.equals(cartItem._id));

    if (menuItem) {
      totalPrice += menuItem.price;
    }
  });

  res.status(200).json({ totalPrice });

});








module.exports = {getRestaurants, getCartPrice, getMenuItems};