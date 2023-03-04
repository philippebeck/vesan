"use strict";

const express = require("express");
const router  = express.Router();
const nem     = require("nemjs");

const UserCtrl = require("../controller/UserCtrl");

/* Public */
router.get("/avatar/:id", UserCtrl.readAvatar);
router.post("/", UserCtrl.createUser);
router.post("/login", UserCtrl.loginUser);
router.post("/message", UserCtrl.sendMessage);
router.post("/password", UserCtrl.forgotPass);

/* Private */
router.get("/", nem.checkAuth, UserCtrl.listUsers);
router.get("/:id", nem.checkAuth, UserCtrl.readUser);
router.put("/:id", nem.checkAuth, UserCtrl.updateUser);
router.delete("/:id", nem.checkAuth, UserCtrl.deleteUser);

module.exports = router;
