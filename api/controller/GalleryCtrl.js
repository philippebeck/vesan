"use strict";

const formidable  = require("formidable");
const fs          = require("fs");
const nem         = require("nemjs");

const GalleryModel  = require("../model/GalleryModel");
const ImageModel    = require("../model/ImageModel");

require("dotenv").config();

const GALLERIES_IMG = process.env.IMG_URL + "galleries/";
const GALLERIES_THUMB = process.env.THUMB_URL + "galleries/";
const form = formidable();

//! ****************************** CHECKERS ******************************

/**
 * CHECK GALLERY DATA
 * @param {string} name 
 * @param {string} author 
 * @param {object} res 
 */
exports.checkGalleryData = (name, author, res) => {
  const MAX = process.env.STRING_MAX;
  const MIN = process.env.STRING_MIN;

  if (!nem.checkRange(author, MIN, MAX)) {
    return res.status(403).json({ message: process.env.CHECK_NAME });
  }

  if (!nem.checkRange(name, MIN, MAX)) { 
    return res.status(403).json({ message: process.env.CHECK_NAME });
  }
}

/**
 * CHECK GALLERY UNIQUE
 * @param {string} name 
 * @param {object} gallery 
 * @param {object} res 
 * @returns
 */
exports.checkGalleryUnique = (name, gallery, res) => {
  if (gallery.name === name) {
    return res.status(403).json({ message: process.env.DISPO_NAME });
  }
}

/**
 * CHECK GALLERIES FOR UNIQUE
 * @param {string} id 
 * @param {array} galleries 
 * @param {string} name 
 * @param {object} res 
 */
exports.checkGalleriesForUnique = (id, galleries, name, res) => {
  for (let gallery of galleries) {
    if (!gallery._id.equals(id)) { 
      this.checkGalleryUnique(name, gallery, res) 
    }
  }
}

//! ****************************** PUBLIC ******************************

/**
 * LIST GALLERIES
 * @param {object} req 
 * @param {object} res 
 */
exports.listGalleries = (req, res) => {
  GalleryModel
    .find()
    .then((galleries) => { res.status(200).json(galleries) })
    .catch(() => res.status(404).json({ message: process.env.GALLERIES_NOT_FOUND }));
}

/**
 * READ A GALLERY
 * @param {object} req 
 * @param {object} res 
 */
exports.readGallery = (req, res) => {
  GalleryModel
  .findById(req.params.id)
  .then((gallery) => { res.status(200).json(gallery) })
  .catch(() => res.status(404).json({ message: process.env.GALLERY_NOT_FOUND }));
}

//! ****************************** PRIVATE ******************************

/**
 * CREATE GALLERY
 * @param {object} req 
 * @param {object} res 
 * @param {function} next 
 */
exports.createGallery = (req, res, next) => {
  form.parse(req, (err, fields) => {
    if (err) { next(err); return }

    this.checkGalleryData(fields.name, fields.author, res);

    GalleryModel
      .find()
      .then((galleries) => {
        for (let gallery of galleries) { 
          this.checkGalleryUnique(fields.name, gallery, res) 
        }

        let cover = nem.getPosterName(fields.name);

        let gallery = new GalleryModel({
          name: fields.name,
          author: fields.author,
          cover: cover
        });

        gallery
          .save()
          .then(() => res.status(201).json({ message: process.env.GALLERY_CREATED }))
          .catch(() => res.status(400).json({ message: process.env.GALLERY_NOT_CREATED }));
      })
      .catch(() => res.status(404).json({ message: process.env.GALLERIES_NOT_FOUND }));
  })
}

/**
 * UPDATE GALLERY
 * @param {object} req 
 * @param {object} res 
 * @param {function} next 
 */
exports.updateGallery = (req, res, next) => {
  form.parse(req, (err, fields) => {
    if (err) { next(err); return }

    this.checkGalleryData(fields.name, fields.author, res);

    GalleryModel
      .find()
      .then((galleries) => {
        this.checkGalleriesForUnique(req.params.id, galleries, fields.name, res);

        let gallery = {
          name: fields.name,
          author: fields.author
        };

        GalleryModel
          .findByIdAndUpdate(req.params.id, { ...gallery, _id: req.params.id })
          .then(() => res.status(200).json({ message: process.env.GALLERY_UPDATED }))
          .catch(() => res.status(400).json({ message: process.env.GALLERY_NOT_UPDATED }));
      })
      .catch(() => res.status(404).json({ message: process.env.GALLERIES_NOT_FOUND }));
  })
}

/**
 * DELETE GALLERY
 * @param {object} req 
 * @param {object} res 
 */
exports.deleteGallery = (req, res) => {
  ImageModel
    .find({ gallery: req.params.id })
    .then(images => {
      for (let image of images) {
        fs.unlink(GALLERIES_THUMB + image.name, () => {
          fs.unlink(GALLERIES_IMG + image.name, () => {});
        });
      }
      ImageModel
        .deleteMany({ gallery: req.params.id })
        .then(() =>

          GalleryModel
            .findByIdAndDelete(req.params.id)
            .then(() => res.status(204).json({ message: process.env.GALLERY_DELETED }))
            .catch(() => res.status(400).json({ message: process.env.GALLERY_NOT_DELETED }))
        )
        .catch(() => res.status(400).json({ message: process.env.IMAGE_DELETE_MANY }));
    })
    .catch(() => res.status(404).json({ message: process.env.IMAGES_NOT_FOUND }));
}
