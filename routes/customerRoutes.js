const express = require("express");
const router = express.Router();
const {
  getRestaurants,
  getCartPrice,
  getMenuItems,
  getItem,
} = require("../controllers/customerController");

router.get("/restaurants", getRestaurants);

router.get("/cartprice", getCartPrice);

router.get("/menuitems", getMenuItems);

router.get("/getitem", getItem);

module.exports = router;
