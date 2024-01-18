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

router.put("/menuitems", updateItem);

router.delete("/menuitems", deleteItem);

// router.put("/updatequantity", updateQuantity);

module.exports = router;
