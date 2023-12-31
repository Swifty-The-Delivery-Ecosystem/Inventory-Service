const express = require('express');
const router = express.Router();
const {getRestaurants, getCartPrice, getMenuItems}  = require("../controllers/customerController");

router.get('/restaurants', getRestaurants);

router.get('/cartprice', getCartPrice);

router.get('/menuitems', getMenuItems);

module.exports = router;