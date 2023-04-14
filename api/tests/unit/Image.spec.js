const mongoose = require("mongoose");
const request = require("supertest");
const app = require("../../app");

require("dotenv").config();

beforeEach(async () => { await mongoose.connect(process.env.DB) });
afterEach(async () => { await mongoose.connection.close()
});

describe("Image", () => {

  test("get images of a gallery", async () => {
    const res = await request(app)
      .get(process.env.ROUTE_IMAGE + "/642982fde24b20699b7a37e5");

    expect(res.statusCode).toBe(200);
    expect(res.body.length).toBeGreaterThan(0);
  });
});
