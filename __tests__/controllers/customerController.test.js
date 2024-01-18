const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../../index');

require("dotenv").config();

beforeEach(async () => {
  await mongoose.connect(process.env.CONNECTION_STRING);
});

afterEach(async () => {
  await mongoose.connection.close();
});


describe("GET /api/v1/customer/vendors", ()=>{
  it("should return a list of vendors", async() => {
    const res = await request(app).get('/api/v1/customer/vendors');
    expect(res.statusCode).toBe(200);
  })
})