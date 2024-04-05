const request = require("supertest");
const mongoose = require("mongoose");
const app = require("../../../index");
const MenuItem = require("../../../models/menuItem.model");
const Menu = require("../../../models/menu.model");
const randomUtils = require("../../../utils/random.utils");

describe("DELETE /api/v1/vendor/menuitems", () => {
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

  test("Delete Item", async () => {
    const itemIdToDelete = item_id;
    const res = await request(app)
      .delete(`/api/v1/inventory/vendor/menuitems/${itemIdToDelete}`)
      .set(
        "Authorization",
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1YTdkYTk5ZGZiOWYyM2Q3ZTE5YjI1YiJ9.TKFTXTvxD2aE4b0L3yo5JbPLAK788RUEg51OOX7mLN4"
      )
      .set("Accept", "application/json")
      .expect(200);

    const deletedItem = await MenuItem.findOne({ item_id: itemIdToDelete });
    expect(deletedItem).toBeNull();

    const menu = await Menu.findOne({ vendor_id: vendor_id });
    expect(menu).toBeTruthy();
    const menuItemInMenu = menu.items.find(
      (menuItem) => menuItem.item_id === itemIdToDelete
    );
    expect(menuItemInMenu).toBeUndefined();
  }, 100000);
});
