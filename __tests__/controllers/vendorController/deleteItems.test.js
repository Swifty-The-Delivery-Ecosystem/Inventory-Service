const request = require("supertest");
const mongoose = require("mongoose");
const app = require("../../../index");
const MenuItem = require("../../../models/menuItem.model");
const Menu = require("../../../models/menu.model");

describe("DELETE /api/v1/vendor/menuitems", () => {
  it("Delete Item", async () => {
    const itemIdToDelete = "91eb5882-3c53-4b3c-9183-2c1aed4537eb";
    const itemToBeDeleted = await MenuItem.findOne({
      item_id: itemIdToDelete,
    });
    expect(itemToBeDeleted).toBeTruthy();
    const vendor_id = itemToBeDeleted.vendor_id;
    const res = await request(app)
      .delete("/api/v1/vendor/menuitems")
      .query({ id: itemIdToDelete })
      .set(
        "Authorization",
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1YTdkYTk5ZGZiOWYyM2Q3ZTE5YjI1YiJ9.TKFTXTvxD2aE4b0L3yo5JbPLAK788RUEg51OOX7mLN4"
      )
      .expect(200);
    const deletedItem = await MenuItem.findOne({ item_id: itemIdToDelete });
    expect(deletedItem).toBeNull();

    const menu = await Menu.findOne({ vendor_id: vendor_id });
    expect(menu).toBeTruthy();
    const menuItemInMenu = menu.items.find(
      (menuItem) => menuItem.item_id === itemIdToDelete
    );
    expect(menuItemInMenu).toBeUndefined();
  });
});
