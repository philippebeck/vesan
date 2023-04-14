const mongoose = require("mongoose");
const request = require("supertest");
const app = require("../../app");

require("dotenv").config();

beforeEach(async () => {
  await mongoose.connect(process.env.DB);
});

afterEach(async () => {
  await mongoose.connection.close();
});

describe("ProductCtrl", () => {

  test("GET /products", async () => {
    const res = await request(app)
      .get("/products");

    expect(res.statusCode).toBe(200);
    expect(res.body.length).toBeGreaterThan(0);
  });

  test("GET /products/:id", async () => {
    const res = await request(app)
      .get("/products/642025c27596058bd79a8df5");

    expect(res.statusCode).toBe(200);
    expect(res.body.name).toBe("Web");
  });
});
