const express = require('express');
const router = express.Router();
const {getVendors}  = require("../controllers/customerController");

router.get('/vendors', getVendors);

// router.get('/cartprice', getCartPrice);

// router.get('/menuitems', getMenuItems);

module.exports = router;