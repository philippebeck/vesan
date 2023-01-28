"use strict";

const express = require("express");
const router  = express.Router();
const nem     = require("nemjs");

const CommentCtrl = require("../controller/CommentCtrl");

router.get("/", CommentCtrl.listComments);
router.post("/", nem.checkAuth, CommentCtrl.createComment);
router.put("/:id", nem.checkAuth, CommentCtrl.updateComment);
router.delete("/:id", nem.checkAuth, CommentCtrl.deleteComment);

module.exports = router;
