const express = require("express");
const {
  addItem,
  updateItem,
  deleteItem,
  updateAvailablity,
  getAllItems,
  createDiscount,
  deleteDiscount,
} = require("../controllers/vendorController");
const extractTokenMiddleware = require("../middleware/authMiddleware");

const router = express.Router();
// router.use(extractTokenMiddleware);

router.get("/menuitems", extractTokenMiddleware, getAllItems);

router.post("/menuitems",extractTokenMiddleware, addItem);

router.put("/menuitems",extractTokenMiddleware, updateItem);

router.delete("/menuitems",extractTokenMiddleware, deleteItem);

router.put("/updatequantity",extractTokenMiddleware, updateAvailablity);

router.post("/discount", extractTokenMiddleware, createDiscount);

router.delete("/discount", extractTokenMiddleware, deleteDiscount);


module.exports = router;
