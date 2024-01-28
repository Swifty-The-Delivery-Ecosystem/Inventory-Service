const express = require("express");
const router = express.Router();
const {
  getVendors,
  getVendorById,
  getCartPrice,
  getVendorDetailsById,
} = require("../controllers/customerController");

router.get("/vendors", getVendors);

router.get("/vendors/:vendor_id", getVendorById);

router.get("/vendors/details/:vendor_id", getVendorDetailsById);

router.get("/cartprice", getCartPrice);

module.exports = router;
