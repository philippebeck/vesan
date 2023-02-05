"use strict";

const express = require("express");
const router  = express.Router();
const nem     = require("nemjs");

const OrderCtrl = require("../controller/OrderCtrl");

/* Public */
router.post("/", nem.checkAuth, OrderCtrl.createOrder);

/* Private */
router.get("/", nem.checkAuth, OrderCtrl.listOrders);
router.put("/:id", nem.checkAuth, OrderCtrl.updateOrder);
router.delete("/:id", nem.checkAuth, OrderCtrl.deleteOrder);

module.exports = router;
