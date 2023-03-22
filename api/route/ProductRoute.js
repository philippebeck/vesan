"use strict";

const express     = require("express");
const router      = express.Router();
const nem         = require("nemjs");
const ProductCtrl = require("../controller/ProductCtrl");

/* Public */
router.get("/", ProductCtrl.listProducts);
router.get("/:id", ProductCtrl.readProduct);

/* Private */
router.post("/", nem.checkAuth, ProductCtrl.createProduct);
router.put("/:id", nem.checkAuth, ProductCtrl.updateProduct);
router.delete("/:id", nem.checkAuth, ProductCtrl.deleteProduct);

module.exports = router;
