const asyncHandler = require("express-async-handler");
const MenuItem = require("../models/menuItemModel");
const Restaurant = require("../models/restaurantModel");

//@desc Get All Restaurants
//@route GET /api/customer/restaurants
//@access public

const getRestaurants = asyncHandler(async (req, res) => {
  const primaryloc = req.query.location;
  const restaurants = await Restaurant.find({ location: primaryloc });
  res.status(200).json(restaurants);
});

//@desc Get All Menu Items of a Restaurant
//@route GET /api/customer/menuitems
//@access public

const getMenuItems = asyncHandler(async (req, res) => {
  const restaurant_id = req.query.restaurant_id;
  const restaurant = await Restaurant.findOne({ _id: restaurant_id });

  if (!restaurant) {
    return res.status(404).json({ message: "Restaurant not found" });
  }
  res.status(200).json(restaurant.items);
});

//@desc Get Cart Value
//@route GET /api/customer/cartprice
//@access public

const getCartPrice = asyncHandler(async (req, res) => {
  try {
    const { restaurantID, cartItems } = req.query;

    // Validate input
    if (!restaurantID || !cartItems) {
      return res.status(400).json({ error: "Invalid input parameters" });
    }

    // Parse cartItems string into a JSON array
    const parsedCartItems = JSON.parse(cartItems);

    // Find the restaurant by ID
    const restaurant = await Restaurant.findOne({ _id: restaurantID });

    if (!restaurant) {
      return res.status(404).json({ error: "Restaurant not found" });
    }

    // Access menu items
    const menuItems = restaurant.items;

    // Calculate total cart price
    let totalPrice = 0;

    for (const cartItem of parsedCartItems) {
      const menuItem = menuItems.find(
        (item) => String(item.item_id) === cartItem.id
      );

      if (menuItem) {
        totalPrice += menuItem.price * cartItem.quantity;
      } else {
      }
    }

    // Return the total cart price
    return res.json({ totalPrice });
  } catch (error) {
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

const getItem = asyncHandler(async (req, res) => {
  try {
    const { cartItems } = req.query;
    let finalitems = [];

    const parsedCartItems = JSON.parse(cartItems);

    const menuItems = await MenuItem.find();

    for (let i = 0; i < parsedCartItems.length; i++) {
      const cartItem = parsedCartItems[i];
      let menuItem = null;

      for (let j = 0; j < menuItems.length; j++) {
        const item = menuItems[j];

        if (String(item.item_id) === cartItem.id) {
          menuItem = item;
          finalitems.push(menuItem);
          break;
        }
      }
    }

    return res.json({ finalitems });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = { getRestaurants, getCartPrice, getMenuItems, getItem };
