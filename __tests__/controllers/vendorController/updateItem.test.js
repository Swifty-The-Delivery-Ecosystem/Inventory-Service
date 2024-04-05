const request = require("supertest");
const mongoose = require("mongoose");
const app = require("../../../index");
const MenuItem = require("../../../models/menuItem.model");
const Menu = require("../../../models/menu.model");
const randomUtils = require("../../../utils/random.utils");

describe("PUT /api/v1/vendor/menuitems", () => {
  let item_id;

  test("Add Item", async () => {
    const res = await request(app)
      .post("/api/v1/inventory/vendor/menuitems")
      .set(
        "Authorization",
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NWNjYzdmMmQ3N2RlM2UxMmUwZjYxNjIiLCJpYXQiOjE3MDc5MTkzNjEsImV4cCI6MTcwODM1MTM2MX0.ciIuu3Unw1_xXOzPV0SSBcIGhnTShOvpt456LDBYGgE"
      )
      .set("Accept", "application/json")
      .send({
        name: randomUtils.randomName(),
        is_veg: randomUtils.randomVeg(),
        image_url: randomUtils.randomImage(),
        price: randomUtils.randomPrice(),
        description: randomUtils.randomDescription(),
        quantity: randomUtils.randomQuantity(),
        rating: randomUtils.randomRating(),
        number_of_ratings: randomUtils.randomNumOfRating(),
        tags: ["Paneer", "Momos", "Snacks"],
        category: "Momos",
        is_available: true,
        nutritional_values: "Calories: 500, Protein: 25g, Fat: 20g",
        is_healthy: randomUtils.randomHealthy(),
        on_offer: false,
        offer_price: 49,
      });

    item_id = res.body.item_id;
  }, 100000);

  it("Update Item", async () => {
    const itemIdToUpdate = item_id;
    const itemToUpdate = await MenuItem.findOne({ item_id: itemIdToUpdate });
    // const vendor_id = itemToUpdate.vendor_id;
    const new_name = randomUtils.randomName();

    const res = await request(app)
      .put("/api/v1/inventory/vendor/menuitems")
      .query({ id: itemIdToUpdate })
      .set(
        "Authorization",
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NWNjYzdmMmQ3N2RlM2UxMmUwZjYxNjIiLCJpYXQiOjE3MDc5MTkzNjEsImV4cCI6MTcwODM1MTM2MX0.ciIuu3Unw1_xXOzPV0SSBcIGhnTShOvpt456LDBYGgE"
      )
      .set("Accept", "application/json")
      .send({
        item_id: itemIdToUpdate,
        vendor_id: vendor_id,
        name: new_name,
        is_veg: true,
        image_url: "https://i.ibb.co/jZgGpxX/momo-blog-500x500.jpg",
        price: 60,
        description: "A delicious paneer Momos with exotic red sauce.",
        quantity: 10,
        rating: 4.6,
        number_of_ratings: 30,
        tags: ["Paneer", "Momos", "Snacks"],
        category: "Momos",
        is_available: true,
        nutritional_values: "Calories: 500, Protein: 25g, Fat: 20g",
        is_healthy: false,
        on_offer: false,
        offer_price: 49,
      })
      .expect(200);
    expect(res.body).toHaveProperty("name");
    expect(res.body).toHaveProperty("price");

    // const updatedItem = await MenuItem.findOne({ item_id: itemIdToUpdate });
    // expect(updatedItem).toBeTruthy();
    // expect(updatedItem.name).toEqual(new_name);
    // expect(updatedItem.is_veg).toEqual(true);
    // expect(updatedItem.image_url).toEqual(
    //   "https://i.ibb.co/jZgGpxX/momo-blog-500x500.jpg"
    // );
    // expect(updatedItem.price).toEqual(60);
    // expect(updatedItem.description).toEqual(
    //   "A delicious paneer Momos with exotic red sauce."
    // );
    // expect(updatedItem.quantity).toEqual(10);
    // expect(updatedItem.rating).toEqual(4.6);
    // expect(updatedItem.number_of_ratings).toEqual(30);
    // expect(updatedItem.tags).toEqual(["Paneer", "Momos", "Snacks"]);
    // expect(updatedItem.category).toEqual("Momos");
    // expect(updatedItem.is_available).toEqual(true);
    // expect(updatedItem.nutritional_values).toEqual(
    //   "Calories: 500, Protein: 25g, Fat: 20g"
    // );
    // expect(updatedItem.is_healthy).toEqual(false);
    // expect(updatedItem.on_offer).toEqual(false);
    // expect(updatedItem.offer_price).toEqual(49);

    // const menu = await Menu.findOne({ vendor_id: updatedItem.vendor_id });
    // expect(menu).toBeTruthy();
    // const menuItemInMenu = menu.items.find(
    //   (menuItem) => menuItem.item_id === itemIdToUpdate
    // );
    // expect(menuItemInMenu).toBeTruthy();
    // expect(menuItemInMenu.name).toEqual(new_name);
    // expect(menuItemInMenu.is_veg).toEqual(true);
    // expect(menuItemInMenu.image_url).toEqual(
    //   "https://i.ibb.co/jZgGpxX/momo-blog-500x500.jpg"
    // );
    // expect(menuItemInMenu.price).toEqual(60);
    // expect(menuItemInMenu.description).toEqual(
    //   "A delicious paneer Momos with exotic red sauce."
    // );
    // expect(menuItemInMenu.quantity).toEqual(10);
    // expect(menuItemInMenu.rating).toEqual(4.6);
    // expect(menuItemInMenu.number_of_ratings).toEqual(30);
    // expect(menuItemInMenu.tags).toEqual(["Paneer", "Momos", "Snacks"]);
    // expect(menuItemInMenu.category).toEqual("Momos");
    // expect(menuItemInMenu.is_available).toEqual(true);
    // expect(menuItemInMenu.nutritional_values).toEqual(
    //   "Calories: 500, Protein: 25g, Fat: 20g"
    // );
    // expect(menuItemInMenu.is_healthy).toEqual(false);
    // expect(menuItemInMenu.on_offer).toEqual(false);
    // expect(menuItemInMenu.offer_price).toEqual(49);
  });
}, 100000);
