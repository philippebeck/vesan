"use strict";

const express = require("express");
const router  = express.Router();
const nem     = require("nemjs");

const ReviewCtrl = require("../controller/ReviewCtrl");

router.get("/", ReviewCtrl.listReviews);
router.post("/", nem.checkAuth, ReviewCtrl.createReview);
router.put("/:id", nem.checkAuth, ReviewCtrl.updateReview);
router.delete("/:id", nem.checkAuth, ReviewCtrl.deleteReview);

module.exports = router;
