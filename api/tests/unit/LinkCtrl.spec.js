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

describe("GET /links", () => {
  test("get all links", async () => {
    const res = await request(app)
      .get("/links");

    expect(res.statusCode).toBe(200);
    expect(res.body.length).toBeGreaterThan(0);
  });
});
