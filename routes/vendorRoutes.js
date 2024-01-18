const express = require("express");
const {
  addItem,
  updateItem,
  deleteItem,
  // updateQuantity,
} = require("../controllers/vendorController");
const extractTokenMiddleware = require("../middleware/authMiddleware");

const router = express.Router();
router.use(extractTokenMiddleware);

router.post("/menuitems", addItem);

router.put("/updateitem", updateItem);

router.delete("/deleteitem", deleteItem);

// router.put("/updatequantity", updateQuantity);

module.exports = router;
