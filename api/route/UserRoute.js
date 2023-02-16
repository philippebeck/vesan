"use strict";

const express = require("express");
const router  = express.Router();
const nem     = require("nemjs");

const UserCtrl = require("../controller/UserCtrl");

/* Public */
router.get("/check", UserCtrl.checkUsers);
router.get("/avatar/:id", UserCtrl.getAvatar);
router.post("/", UserCtrl.createUser);
router.post("/check", UserCtrl.checkUser);
router.post("/email", UserCtrl.checkEmail);
router.post("/forgot", UserCtrl.forgotPass);
router.post("/login", UserCtrl.loginUser);
router.post("/send", UserCtrl.sendMessage);

/* Private */
router.get("/", nem.checkAuth, UserCtrl.listUsers);
router.get("/:id", nem.checkAuth, UserCtrl.readUser);
router.put("/:id", nem.checkAuth, UserCtrl.updateUser);
router.delete("/:id", nem.checkAuth, UserCtrl.deleteUser);

module.exports = router;
