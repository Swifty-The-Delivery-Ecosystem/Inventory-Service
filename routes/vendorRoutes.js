const express = require("express");
const {
  addItem,
  updateItem,
  deleteItem,
  updateAvailablity,
  getAllItems,
} = require("../controllers/vendorController");
const extractTokenMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/menuitems", extractTokenMiddleware, getAllItems);

router.post("/menuitems",extractTokenMiddleware, addItem);

router.put("/menuitems",extractTokenMiddleware, updateItem);

router.delete("/menuitems",extractTokenMiddleware, deleteItem);

router.put("/updatequantity",extractTokenMiddleware, updateAvailablity);

module.exports = router;
