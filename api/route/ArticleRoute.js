"use strict";

const express     = require("express");
const router      = express.Router();
const nem         = require("nemjs");
const ArticleCtrl = require("../controller/ArticleCtrl");

/* Public */
router.get("/", ArticleCtrl.listArticles);
router.get("/:id", ArticleCtrl.readArticle);

/* Private */
router.post("/", nem.checkAuth, ArticleCtrl.createArticle);
router.put("/:id", nem.checkAuth, ArticleCtrl.updateArticle);
router.delete("/:id", nem.checkAuth, ArticleCtrl.deleteArticle);

module.exports = router;
