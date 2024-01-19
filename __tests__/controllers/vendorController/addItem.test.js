const mongoose = require("mongoose");
require("dotenv").config();
const request = require("supertest");
const app = require("../../../index");

describe("POST /api/v1/vendor/menuitems", () => {
  it("Add an item to the menu", async () => {
    const res = await request(app)
      .post("/api/v1/vendor/menuitems")
      .set(
        "Authorization",
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1YTdkYTk5ZGZiOWYyM2Q3ZTE5YjI1YiJ9.TKFTXTvxD2aE4b0L3yo5JbPLAK788RUEg51OOX7mLN4"
      )
      .send({
        name: "Paneer Momos",
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
      .expect(201);
  });
});
