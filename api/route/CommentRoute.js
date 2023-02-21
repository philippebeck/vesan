"use strict";

const express = require("express");
const router  = express.Router();
const nem     = require("nemjs");

const CommentCtrl = require("../controller/CommentCtrl");

/* Public */
router.get("/", CommentCtrl.listComments);
router.get("/:id", CommentCtrl.listArticleComments);

/* Private */
router.post("/", nem.checkAuth, CommentCtrl.createComment);
router.put("/:id", nem.checkAuth, CommentCtrl.updateComment);
router.delete("/:id", nem.checkAuth, CommentCtrl.deleteComment);

module.exports = router;
