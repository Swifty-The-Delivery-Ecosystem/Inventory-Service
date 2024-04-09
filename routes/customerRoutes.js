const express = require("express");
const router = express.Router();
const {
  getVendors,
  getVendorById,
  getCartPrice,
  getVendorDetailsById,
  getItem,
  searchRestaurants,
  searchMenuItems,
} = require("../controllers/customerController");

router.get("/vendors", getVendors);

router.get("/vendors/:vendor_id", getVendorById);

router.get("/vendors/details/:vendor_id", getVendorDetailsById);

router.get("/cartprice", getCartPrice);

router.get("/getItem", getItem);

router.get("/searchRestaurant", searchRestaurants);

router.get("/searchItem", searchMenuItems);

module.exports = router;
