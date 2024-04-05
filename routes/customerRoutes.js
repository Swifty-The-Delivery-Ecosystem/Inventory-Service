const express = require("express");
const router = express.Router();
const {
  getVendors,
  getVendorById,
  getCartPrice,
  getVendorDetailsById,
  getItem
} = require("../controllers/customerController");

router.get("/vendors", getVendors);

router.get("/vendors/:vendor_id", getVendorById);

router.get("/vendors/details/:vendor_id", getVendorDetailsById);

router.get("/cartprice", getCartPrice);

router.get("/getItem", getItem);

module.exports = router;
