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
router.use(extractTokenMiddleware);

router.get("/menuitems", getAllItems);

router.post("/menuitems", addItem);

router.put("/menuitems", updateItem);

router.delete("/menuitems", deleteItem);

router.put("/updatequantity", updateAvailablity);

module.exports = router;
