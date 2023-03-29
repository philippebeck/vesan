"use strict";

const express   = require("express");
const mongoose  = require("mongoose");
const helmet    = require("helmet");
const sanitize  = require("express-mongo-sanitize");
const cors      = require("cors");

const articleRoute  = require("./route/ArticleRoute");
const authRoute     = require("./route/AuthRoute");
const commentRoute  = require("./route/CommentRoute");
const galleryRoute  = require("./route/GalleryRoute");
const imageRoute    = require("./route/ImageRoute");
const linkRoute     = require("./route/LinkRoute");
const orderRoute    = require("./route/OrderRoute");
const productRoute  = require("./route/ProductRoute");
const reviewRoute   = require("./route/ReviewRoute");
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
 * ROUTES
 */
app.use(process.env.ROUTE_ARTICLE, articleRoute);
app.use(process.env.ROUTE_AUTH, authRoute);
app.use(process.env.ROUTE_COMMENT, commentRoute);
app.use(process.env.ROUTE_GALLERY, galleryRoute);
app.use(process.env.ROUTE_IMAGE, imageRoute);
app.use(process.env.ROUTE_LINK, linkRoute);
app.use(process.env.ROUTE_ORDER, orderRoute);
app.use(process.env.ROUTE_PRODUCT, productRoute);
app.use(process.env.ROUTE_REVIEW, reviewRoute);
app.use(process.env.ROUTE_USER, userRoute);

module.exports = app;
