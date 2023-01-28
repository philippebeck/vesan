"use strict";

const express   = require("express");
const mongoose  = require("mongoose");
const helmet    = require("helmet");
const sanitize  = require("express-mongo-sanitize");
const rateLimit = require("express-rate-limit");
const cors      = require("cors");

const articleRoute  = require("./route/ArticleRoute");
const commentRoute  = require("./route/CommentRoute");
const postRoute     = require("./route/PostRoute");
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
app.use(process.env.ROUTE_ARTICLE, articleRoute, limiter);
app.use(process.env.ROUTE_COMMENT, commentRoute, limiter);
app.use(process.env.ROUTE_POST, postRoute, limiter);
app.use(process.env.ROUTE_USER, userRoute, limiter);

module.exports = app;
