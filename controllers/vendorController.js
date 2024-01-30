const asyncHandler = require("express-async-handler");
const MenuItem = require("../models/menuItem.model");
const Vendor = require("../models/vendor.model");
const Menu = require("../models/menu.model");
const { v4: uuidv4 } = require("uuid");
const { default: mongoose } = require("mongoose");

//@desc getItems
//@route GET /api/v1/menuitems
//@access private

const getAllItems = asyncHandler(async (req, res) => {
  const { vendor_id } = req;
  if (!vendor_id) {
    res.status(400);
    throw new Error("Vendor ID is required");
  }

  const { startIndex, pageSize } = req.query;

  const vendor_id_object = new mongoose.Types.ObjectId(vendor_id);

  const menu = await Menu.findOne({ vendor_id: vendor_id_object });

  if (!menu) {
    res.status(404);
    throw new Error("Menu not found for the given vendor_id");
  }

  const totalItems = menu.items.length;

  const paginatedItems = menu.items.slice(startIndex, startIndex + pageSize);

  res.status(200).json({
    totalItems,
    startIndex,
    pageSize,
    items: paginatedItems,
  });
});

//@desc additems
//@route POST /api/v1/menuitems
//@access private

const addItem = asyncHandler(async (req, res) => {
  const {
    name,
    type,
    price,
    quantity,
    image_url,
    description,
    rating,
    is_veg,
    number_of_ratings,
    tags,
    category,
    is_available,
    nutritional_values,
    is_healthy,
    on_offer,
    offer_price,
  } = req.body;

  const { vendor_id } = req;
  console.log(vendor_id);

  if (!vendor_id || !name || !price || !quantity || !image_url) {
    res.status(400);
    throw new Error("All fields are required");
  }

  let vendor_id_object = new mongoose.Types.ObjectId(vendor_id);
  const menu = await Menu.findOne({
    vendor_id: vendor_id_object,
  });

  if (!menu) {
    res.status(404);
    throw new Error("Restaurant not found");
  }

  const item_id = uuidv4();

  const newItem = await MenuItem.create({
    item_id,
    name,
    vendor_id: vendor_id,
    type,
    price,
    quantity,
    image_url,
    description,
    rating,
    is_veg,
    number_of_ratings,
    tags,
    category,
    is_available,
    nutritional_values,
    is_healthy,
    on_offer,
    offer_price,
    item_id: item_id,
  });

  menu.items.push({
    name,
    vendor_id: vendor_id,
    type,
    price,
    quantity,
    image_url,
    description,
    rating,
    is_veg,
    number_of_ratings,
    tags,
    category,
    is_available,
    nutritional_values,
    is_healthy,
    on_offer,
    offer_price,
    item_id: item_id,
  });

  await menu.save();

  res.status(201).json(newItem);
});

//@desc Update Items by item_id
//@route PUT /api/v1/menuitems/{id}
//@access private

const updateItem = asyncHandler(async (req, res) => {
  const item = await MenuItem.findOne({ item_id: req.query.id });
  if (!item) {
    res.status(404);
    throw new Error("item not found");
  }

  const { vendor_id } = req;

  let vendor_id_object = new mongoose.Types.ObjectId(vendor_id);
  const updatedItem = await MenuItem.findOneAndUpdate(
    { item_id: req.query.id },
    {
      name: req.body.name,
      vendor_id: vendor_id,
      price: req.body.price,
      quantity: req.body.quantity,
      image_url: req.body.image_url,
      description: req.body.description,
      rating: req.body.rating,
      is_veg: req.body.is_veg,
      number_of_ratings: req.body.number_of_ratings,
      tags: req.body.tags,
      category: req.body.category,
      is_available: req.body.is_available,
      nutritional_values: req.body.nutritional_values,
      is_healthy: req.body.is_healthy,
      on_offer: req.body.on_offer,
      offer_price: req.body.offer_price,
      item_id: req.query.id,
    },
    { new: true }
  );

  if (!updatedItem) {
    res.status(404);
    throw new Error("Menu item not found for the given item_id");
  }

  const menu = await Menu.findOne({ vendor_id: vendor_id_object });

  if (!menu) {
    res.status(404);
    throw new Error("Menu not found for the given vendor_id");
  }

  const updatedMenuItems = menu.items.map((menuItem) =>
    menuItem.item_id === req.query.id
      ? {
          name: req.body.name,
          vendor_id: vendor_id,
          price: req.body.price,
          quantity: req.body.quantity,
          image_url: req.body.image_url,
          description: req.body.description,
          rating: req.body.rating,
          is_veg: req.body.is_veg,
          number_of_ratings: req.body.number_of_ratings,
          tags: req.body.tags,
          category: req.body.category,
          is_available: req.body.is_available,
          nutritional_values: req.body.nutritional_values,
          is_healthy: req.body.is_healthy,
          on_offer: req.body.on_offer,
          offer_price: req.body.offer_price,
          item_id: req.query.id,
        }
      : menuItem
  );

  menu.items = updatedMenuItems;

  await menu.save();

  res.status(200).json(updatedItem);
});

//@desc Delete Item by id
//@route DELETE /api/v1/menuitems/{id}
//@access private

const deleteItem = asyncHandler(async (req, res) => {
  const item = await MenuItem.findOne({ item_id: req.query.id });
  if (!item) {
    res.status(404);
    throw new Error("Item not found");
  }
  await MenuItem.deleteOne(item);

  const { vendor_id } = req;

  let vendor_id_object = new mongoose.Types.ObjectId(vendor_id);
  const menu = await Menu.findOne({ vendor_id: vendor_id_object });

  if (!menu) {
    res.status(404);
    throw new Error("Menu not found for the given vendor_id");
  }

  menu.items = menu.items.filter(
    (menuItem) => menuItem.item_id !== req.query.id
  );

  await menu.save();

  res.status(200).json(menu.items);
});

//@desc Update Item availability
//@route DELETE /api/v1/availableitems/{id}
//@access private

const updateAvailablity = asyncHandler(async (req, res) => {
  const item = await MenuItem.findOne({ item_id: req.query.id });
  if (!item) {
    res.status(404);
    throw new Error("Item not found");
  }

  const updatedItem = await MenuItem.findOneAndUpdate(
    { item_id: req.query.id },
    { is_available: false },
    { new: true }
  );

  const { vendor_id } = req;
  const vendor_id_object = new mongoose.Types.ObjectId(vendor_id);
  const menu = await Menu.findOne({ vendor_id: vendor_id_object });

  if (!menu) {
    res.status(404);
    throw new Error("Menu not found for the given vendor_id");
  }

  const updatedMenuItems = menu.items.map((menuItem) =>
    menuItem.item_id === req.query.id
      ? { ...menuItem, is_available: false }
      : menuItem
  );

  menu.items = updatedMenuItems;
  await menu.save();

  res.status(200).json(updatedItem);
});

module.exports = {
  addItem,
  updateItem,
  deleteItem,
  updateAvailablity,
  getAllItems,
};
