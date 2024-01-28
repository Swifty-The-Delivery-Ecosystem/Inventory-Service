const request = require("supertest");
const app = require("../../../index");

describe("GET /api/v1/vendor/menuitems", () => {
  it("Fetch Items from Menu with Pagination", async () => {
    const res = await request(app)
      .get("/api/v1/vendor/menuitems")
      .set(
        "Authorization",
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1YTdkYTk5ZGZiOWYyM2Q3ZTE5YjI1YiJ9.TKFTXTvxD2aE4b0L3yo5JbPLAK788RUEg51OOX7mLN4"
      )
      .query({
        startIndex: 0,
        pageSize: 10,
      })
      .expect(200);
    expect(res.body).toHaveProperty("totalItems");
    expect(res.body).toHaveProperty("startIndex");
    expect(res.body).toHaveProperty("pageSize");
    expect(res.body).toHaveProperty("items");
    expect(Array.isArray(res.body.items)).toBe(true);

    const firstItem = res.body.items[0];
    expect(firstItem).toHaveProperty("item_id");
    expect(firstItem).toHaveProperty("name");
    expect(firstItem).toHaveProperty("is_veg");
    expect(firstItem).toHaveProperty("image_url");
    expect(firstItem).toHaveProperty("price");
    expect(firstItem).toHaveProperty("description");
    expect(firstItem).toHaveProperty("quantity");
    expect(firstItem).toHaveProperty("vendor_id");
    expect(firstItem).toHaveProperty("is_available");
    expect(firstItem).toHaveProperty("is_healthy");
  });
}, 100000);
