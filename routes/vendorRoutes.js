const express = require("express");
const {
  addItem,
  updateItem,
  deleteItem,
  updateQuantity,
} = require("../controllers/vendorController");

const router = express.Router();

router.post("/additem", addItem);

router.put("/updateitem", updateItem);

router.delete("/deleteitem", deleteItem);

router.put("/updatequantity", updateQuantity);

module.exports = router;
