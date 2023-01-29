"use strict";

const express = require("express");
const router  = express.Router();
const nem     = require("nemjs");

const PostCtrl = require("../controller/PostCtrl");

router.get("/", PostCtrl.listPosts);
router.get("/:id", PostCtrl.readPost);
router.post("/", nem.checkAuth, PostCtrl.createPost);
router.put("/:id", nem.checkAuth, PostCtrl.updatePost);
router.delete("/:id", nem.checkAuth, PostCtrl.deletePost);

module.exports = router;
