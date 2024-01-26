const express = require('express');
const router = express.Router();
const {getVendors, getVendorById}  = require("../controllers/customerController");

router.get('/vendors', getVendors);

router.get('/vendors/:vendor_id', getVendorById);

// router.get('/cartprice', getCartPrice);

// router.get('/menuitems', getMenuItems);

module.exports = router;