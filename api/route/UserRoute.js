"use strict";

const express = require("express");
const router  = express.Router();
const nem     = require("nemjs");

const UserCtrl = require("../controller/UserCtrl");

/* Public */
router.post("/login", UserCtrl.loginUser);
router.post("/forgot", UserCtrl.forgotPass);
router.post("/send", UserCtrl.sendMessage);

/* Private */
router.get("/", nem.checkAuth, UserCtrl.listUsers);
router.post("/", nem.checkAuth, UserCtrl.createUser);
router.put("/:id", nem.checkAuth, UserCtrl.updateUser);
router.delete("/:id", nem.checkAuth, UserCtrl.deleteUser);

module.exports = router;
