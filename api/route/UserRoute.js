"use strict";

const express   = require("express");
const router    = express.Router();
const nem       = require("nemjs");
const UserCtrl  = require("../controller/UserCtrl");

/* Public */
router.post("/", UserCtrl.createUser);
router.post("/message", UserCtrl.sendMessage);

/* Private */
router.get("/", nem.checkAuth, UserCtrl.listUsers);
router.get("/:id", nem.checkAuth, UserCtrl.readUser);
router.put("/:id", nem.checkAuth, UserCtrl.updateUser);
router.delete("/:id", nem.checkAuth, UserCtrl.deleteUser);

module.exports = router;
