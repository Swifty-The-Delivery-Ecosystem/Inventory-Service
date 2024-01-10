const express = require("express");
const router = express.Router();
const {
  getRestaurants,
  getCartPrice,
  getMenuItems,
  getItem,
  getRestaurantDetails,
} = require("../controllers/customerController");

router.get("/restaurants", getRestaurants);

router.get("/cartprice", getCartPrice);

router.get("/menuitems", getMenuItems);

router.get("/getitem", getItem);

router.get("/getdetails", getRestaurantDetails);

module.exports = router;
