const asyncHandler = require('express-async-handler');
const MenuItem = require("../models/menuItemModel");

//@desc additems
//@route POST /api/additem
//@access private


const addItem = asyncHandler( async (req,res)=>{
  console.log(req.body);
  const {name , restaurant_id , type , price , quantity , image_url , description , rating} = req.body;
  if(!restaurant_id || !name || !type || !price || !quantity || !image_url){res.status(400);
  throw new Error('All fields are required')}
  const newItem = await MenuItem.create({name , restaurant_id , type , price , quantity , image_url , description , rating});
  res.status(201).json(newItem);
});

//@desc Update Contacts by id
//@route PUT /api/contacts/:id
//@access private

const updateItem = asyncHandler(async (req, res) => {
  const item = await MenuItem.findById(req.params.id);
  if (!item) {
    res.status(404);
    throw new Error("Contact not found");
  }

  const updatedItem = await MenuItem.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  res.status(200).json(updatedItem);
});

//@desc Delete Contacts by id
//@route DELETE /api/contacts/:id
//@access private

const deleteItem =asyncHandler( async (req,res)=>{
  const item = await MenuItem.findById(req.params.id);
  if(!item){
    res.status(404);
    throw new Error("Item not found");
  }
  await MenuItem.deleteOne(item);
  res.status(200).json(item);
});

const updateQuantity = asyncHandler(async (req, res) => {
  const item = await MenuItem.findById(req.params.id);
  if (!item) {
    res.status(404);
    throw new Error("Contact not found");
  }

  const updatedItem = await MenuItem.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  res.status(200).json(updatedItem);
});


module.exports = {
  addItem,
  updateItem,
  deleteItem,
  updateQuantity
};