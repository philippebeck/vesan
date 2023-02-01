"use strict";

const express = require("express");
const router  = express.Router();
const nem     = require("nemjs");

const ReviewCtrl = require("../controller/ReviewCtrl");

/* Public */
router.get("/", ReviewCtrl.listReviews);

/* Private */
router.post("/", nem.checkAuth, ReviewCtrl.createReview);
router.put("/:id", nem.checkAuth, ReviewCtrl.updateReview);
router.delete("/:id", nem.checkAuth, ReviewCtrl.deleteReview);

module.exports = router;
