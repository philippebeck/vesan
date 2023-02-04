"use strict";

const express   = require("express");
const mongoose  = require("mongoose");
const helmet    = require("helmet");
const sanitize  = require("express-mongo-sanitize");
const rateLimit = require("express-rate-limit");
const cors      = require("cors");

const productRoute  = require("./route/ProductRoute");
const reviewRoute   = require("./route/ReviewRoute");
const articleRoute  = require("./route/ArticleRoute");
const commentRoute  = require("./route/CommentRoute");
const userRoute     = require("./route/UserRoute");

require("dotenv").config();

/**
 * MONGODB
 */
mongoose
  .set('strictQuery', true)
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
app.use(process.env.ROUTE_PRODUCT, productRoute);
app.use(process.env.ROUTE_REVIEW, reviewRoute);
app.use(process.env.ROUTE_ARTICLE, articleRoute);
app.use(process.env.ROUTE_COMMENT, commentRoute);
app.use(process.env.ROUTE_USER, userRoute);

module.exports = app;
