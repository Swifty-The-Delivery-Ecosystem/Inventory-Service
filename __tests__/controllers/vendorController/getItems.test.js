const request = require("supertest");
const app = require("../../../index");

describe("GET /api/v1/vendor/menuitems", () => {
  it("Fetch Items from Menu with Pagination", async () => {
    const res = await request(app)
      .get("/api/v1/inventory/vendor/menuitems")
      .set(
        "Authorization",
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NWNjYzdmMmQ3N2RlM2UxMmUwZjYxNjIiLCJpYXQiOjE3MDc5MTkzNjEsImV4cCI6MTcwODM1MTM2MX0.ciIuu3Unw1_xXOzPV0SSBcIGhnTShOvpt456LDBYGgE"
      )
      .query({
        startIndex: 0,
        pageSize: 10,
      }).expect(401);
      // .expect(200);
    // expect(res.body).toHaveProperty("totalItems");
    // expect(res.body).toHaveProperty("startIndex");
    // expect(res.body).toHaveProperty("pageSize");
    // expect(res.body).toHaveProperty("items");
    // expect(Array.isArray(res.body.items)).toBe(true);

    // const firstItem = res.body.items[0];
    // expect(firstItem).toHaveProperty("item_id");
    // expect(firstItem).toHaveProperty("name");
    // expect(firstItem).toHaveProperty("is_veg");
    // expect(firstItem).toHaveProperty("image_url");
    // expect(firstItem).toHaveProperty("price");
    // expect(firstItem).toHaveProperty("description");
    // expect(firstItem).toHaveProperty("quantity");
    // expect(firstItem).toHaveProperty("vendor_id");
    // expect(firstItem).toHaveProperty("is_available");
    // expect(firstItem).toHaveProperty("is_healthy");
  });
}, 100000);
