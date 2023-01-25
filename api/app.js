"use strict";

const express   = require("express");
const mongoose  = require("mongoose");
const helmet    = require("helmet");
const sanitize  = require("express-mongo-sanitize");
const rateLimit = require("express-rate-limit");
const cors      = require("cors");
const userRoute = require("./route/UserRoute");

require("dotenv").config();

/**
 * MONGODB
 */
mongoose
  .connect(process.env.DB, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log(process.env.MONGO_SUCCESS))
  .catch(() => console.log(process.env.MONGO_FAIL));

/**
 * EXPRESS
 */
const app = express();
app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(sanitize());

/**
 * RATE LIMIT
 */
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  standardHeaders: true,
  legacyHeaders: false
});

/**
 * ROUTES
 */
app.use(process.env.ROUTE_USER, userRoute, limiter);

module.exports = app;
