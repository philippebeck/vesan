"use strict";

const express   = require("express");
const router    = express.Router();
const nem       = require("nemjs");
const LinkCtrl  = require("../controller/LinkCtrl");

/* Public */
router.get("/", LinkCtrl.listLinks);

/* Private */
router.post("/", nem.checkAuth, LinkCtrl.createLink);
router.put("/:id", nem.checkAuth, LinkCtrl.updateLink);
router.delete("/:id", nem.checkAuth, LinkCtrl.deleteLink);

module.exports = router;