"use strict";

const express     = require("express");
const router      = express.Router();
const nem         = require("nemjs");
const GalleryCtrl = require("../controller/GalleryCtrl");

/* Public */
router.get("/", GalleryCtrl.listGalleries);
router.get("/:id", GalleryCtrl.readGallery);

/* Private */
router.post("/", nem.checkAuth, GalleryCtrl.createGallery);
router.put("/:id", nem.checkAuth, GalleryCtrl.updateGallery);
router.delete("/:id", nem.checkAuth, GalleryCtrl.deleteGallery);

module.exports = router;
