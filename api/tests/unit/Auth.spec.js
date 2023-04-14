const mongoose = require("mongoose");
const request = require("supertest");
const app = require("../../app");

require("dotenv").config();

beforeEach(async () => { await mongoose.connect(process.env.DB) });
afterEach(async () => { await mongoose.connection.close() });

describe("Auth", () => {

  test("get an avatar", async () => {
    const res = await request(app)
      .get(process.env.ROUTE_AUTH + "/640cde6a7163d1f1a0dbbaef");

    expect(res.statusCode).toBe(200);
    expect(res.body.name).toBe("Stéphanie");
  });
});
