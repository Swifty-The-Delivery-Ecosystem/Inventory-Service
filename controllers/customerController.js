const asyncHandler = require("express-async-handler");
const MenuItem = require("../models/menuItem.model");
const Menu = require("../models/menu.model");
const Vendor = require("../models/vendor.model");
const { default: mongoose } = require("mongoose");

//@desc Get All Vendors
//@route GET /api/customer/Vendors
//@access public

exports.getVendors = asyncHandler(async (req, res) => {
  try {
    const {
      primary_location,
      tag,
      is_veg,
      sort,
      page = 1,
      pageSize = 10,
    } = req.query;
    const filters = {};
    if (primary_location) {
      filters.location_served = { $in: [primary_location] };
    }
    if (tag) {
      filters.tags = { $in: [tag] };
    }
    if (is_veg) {
      filters.is_veg = true;
    }

    const sortOptions = {};
    if (sort) {
      const sortFields = sort.split(",");
      sortFields.forEach((field) => {
        const order = field.endsWith("-") ? -1 : 1;
        const fieldName = field.replace(/[+-]/g, "");
        sortOptions[fieldName] = order;
      });
    }

    const vendors = await Vendor.find({ ...filters, status: "active" })
      .sort(sortOptions)
      .skip((page - 1) * pageSize)
      .limit(pageSize);
    return res.status(200).json(vendors);
  } catch (err) {
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

//@desc Get Vendor By Id
//@route GET /api/customer/Vendor
//@access public

exports.getVendorById = asyncHandler(async (req, res, next) => {
  const vendor_id = req.params.vendor_id;
  const vendor_id_object = new mongoose.Types.ObjectId(vendor_id);

  try {
    const menu = await Menu.findOne({ vendor_id: vendor_id_object });
    return res.status(200).json(menu);
  } catch (err) {
    return res.status(500).json({ error: "Vendor doesnt exist" });
  }
});

exports.getVendorDetailsById = asyncHandler(async (req, res, next) => {
  const vendor_id = req.params.vendor_id;
  const vendor_id_object = new mongoose.Types.ObjectId(vendor_id);

  try {
    const v_details = await Vendor.findOne({ _id: vendor_id_object });
    return res.status(200).json(v_details);
  } catch (err) {
    return res.status(500).json({ error: "Vendor doesnt exist" });
  }
});

const getRestaurantDetails = asyncHandler(async (req, res) => {
  const restaurant_id = req.query.restaurant_id;
  const restaurant = await Restaurant.findOne({ _id: restaurant_id });

  if (!restaurant) {
    return res.status(404).json({ message: "Restaurant not found" });
  }

  res.status(200).json(restaurant);
});

//@desc Get All Menu Items of a Restaurant
//@route GET /api/customer/menuitems
//@access public

// const getMenu = asyncHandler( async (req,res) =>{
//   const vendor_id = req.id
// })

//@desc Get All Menu Items of a Vendor
//@route GET /api/customer/menuitems
//@access public

// const getMenuItems = asyncHandler(async (req, res) => {
//   const Vendor_id = req.query.Vendor_id;
//   const Vendor = await Vendor.findOne({ _id: Vendor_id });

//   if (!Vendor) {
//     return res.status(404).json({ message: "Vendor not found" });
//   }
//   res.status(200).json(Vendor.items);
// });
exports.getCartPrice = asyncHandler(async (req, res) => {
  try {
    const { vendor_id, cartItems } = req.query;

    if (!vendor_id || !cartItems) {
      return res.status(400).json({ error: "Invalid input parameters" });
    }

    const parsedCartItems = JSON.parse(cartItems);

    const restaurant = await Menu.findOne({ vendor_id: vendor_id });

    if (!restaurant) {
      return res.status(404).json({ error: "Restaurant not found" });
    }
    if (!restaurant) {
      return res.status(404).json({ error: "Restaurant not found" });
    }

    // Access menu items
    const menuItems = restaurant.items;

    // Calculate total cart price
    let totalPrice = 0;

    for (const cartItem of parsedCartItems) {
      const menuItem = menuItems.find((item) => {
        return item.item_id === cartItem.id;
      });

      console.log(menuItem);

      if (menuItem) {
        totalPrice += menuItem.price * cartItem.quantity;
      } else {
        console.log("does not work");
      }
    }
    return res.json({ totalPrice });
  } catch (error) {
    return res.status(500).json({ error: error });
  }
});

exports.getItem = asyncHandler(async (req, res) => {
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

//@desc Search Restaurants
//@route GET /api/customer/search/restaurants
//@access public
exports.searchRestaurants = asyncHandler(async (req, res) => {
  const searchTerm = req.query.restaurantName;

  if (!searchTerm) {
    return res.status(400).json({ error: "Search term is required" });
  }
  try {
    const restaurants = await Vendor.find({
      restaurantName: { $regex: searchTerm, $options: "i" },
    });
    return res.status(200).json(restaurants);
  } catch (error) {
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

//@desc Search Menu Items
//@route GET /api/customer/search/menuitems
//@access public

exports.searchMenuItems = asyncHandler(async (req, res) => {
  const itemName = req.query.itemName;

  if (!itemName) {
    return res.status(400).json({ error: "Item name is required" });
  }

  try {
    const menuItems = await MenuItem.find({
      name: { $regex: itemName, $options: "i" },
    });
    return res.status(200).json(menuItems);
  } catch (error) {
    return res.status(500).json({ error: "Internal Server Error" });
  }
});
