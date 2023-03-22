"use strict";

const express   = require("express");
const router    = express.Router();
const nem       = require("nemjs");
const OrderCtrl = require("../controller/OrderCtrl");

/* Private */
router.get("/", nem.checkAuth, OrderCtrl.listOrders);
router.get("/:id", nem.checkAuth, OrderCtrl.listUserOrders);
router.post("/", nem.checkAuth, OrderCtrl.createOrder);
router.put("/:id", nem.checkAuth, OrderCtrl.updateOrder);
router.delete("/:id", nem.checkAuth, OrderCtrl.deleteOrder);

module.exports = router;
