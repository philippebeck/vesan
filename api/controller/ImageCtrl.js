"use strict";

const formidable  = require("formidable");
const fs          = require("fs");
const nem         = require("nemjs");

const GalleryModel  = require("../model/GalleryModel");
const ImageModel    = require("../model/ImageModel");

require("dotenv").config();

const GALLERIES_IMG = process.env.IMG_URL + "galleries/";
const GALLERIES_THUMB = process.env.THUMB_URL + "galleries/";
const form = formidable({ uploadDir: GALLERIES_IMG, keepExtensions: true });

//! ****************************** CHECKER ******************************

/**
 * CHECK IMAGE DATA
 * @param {string} description 
 * @param {object} res 
 */
exports.checkImageData = (description, res) => {
  if (!nem.checkRange(description, process.env.STRING_MIN, process.env.TEXT_MAX)) {
    return res.status(403).json({ message: process.env.CHECK_NAME });
  }
}

//! ****************************** SETTER ******************************

/**
 * SET IMAGE
 * @param {string} image 
 * @param {string} newFilename 
 */
exports.setImage = (image, newFilename) => {
  let input   = "galleries/" + newFilename;
  let output  = "galleries/" + image;

  nem.setImage(input, process.env.IMG_URL + output);
  nem.setThumbnail(input, process.env.THUMB_URL + output);
}

//! ****************************** GETTER ******************************

/**
 * GET IMAGE
 * @param {string} name 
 * @param {string} description 
 * @param {string} gallery 
 * @returns 
 */
exports.getImage = (name, description, gallery) => {

  return {
    name: name,
    description: description,
    gallery: gallery
  }
}

//! ****************************** PUBLIC ******************************

/**
 * LIST GALLERY IMAGES
 * @param {object} req 
 * @param {object} res 
 */
exports.listGalleryImages = (req, res) => {
  ImageModel
    .find({ gallery: req.params.id })
    .then((images) => { res.status(200).json(images) })
    .catch(() => res.status(404).json({ message: process.env.IMAGES_NOT_FOUND }));
};

//! ****************************** PRIVATE ******************************

/**
 * LIST IMAGES
 * @param {object} req 
 * @param {object} res 
 */
exports.listImages = (req, res) => {
  ImageModel
    .find()
    .then((images) => { 

      GalleryModel
        .find()
        .then((galleries) => {
          for (let image of images) {
            for (let gallery of galleries) {

              if (image.gallery === gallery._id.toString()) {
                image.gallery = image.gallery + "-" + gallery.name;
              }
            }
          }
          res.status(200).json(images);
        })
    })
    .catch(() => res.status(404).json({ message: process.env.IMAGES_NOT_FOUND }));
};

/**
 * CREATE IMAGE
 * @param {object} req 
 * @param {object} res 
 * @param {function} next 
 * @returns
 */
exports.createImage = (req, res, next) => {
  form.parse(req, (err, fields, files) => {
    if (err) { next(err); return }

    this.checkImageData(fields.description, res);

    GalleryModel
      .findById(fields.gallery)
      .then((gallery) => {

        ImageModel
        .find({ gallery: fields.gallery })
        .then((images) => { 
          let index = images.length + 1;
          if (index < 10) { index = "0" + index }

          let name = nem.getName(gallery.name) + "-" + index + "." + process.env.IMG_EXT;
          this.setImage(name, files.image.newFilename);
          let image = new ImageModel(this.getImage(name, fields.description, fields.gallery));

          image
            .save()
            .then(() => {
              fs.unlink(GALLERIES_IMG + files.image.newFilename, () => {
                res.status(201).json({ message: process.env.IMAGE_CREATED });
              })
            })
            .catch(() => res.status(400).json({ message: process.env.IMAGE_NOT_CREATED }));
        })
        .catch(() => res.status(404).json({ message: process.env.IMAGES_NOT_FOUND }));
      })
      .catch(() => res.status(404).json({ message: process.env.GALLERY_NOT_FOUND }));
  })
};

/**
 * UPDATE IMAGE
 * @param {object} req 
 * @param {object} res 
 * @param {function} next 
 */
exports.updateImage = (req, res, next) => {
  form.parse(req, (err, fields, files) => {
    if (err) { next(err); return }

    this.checkImageData(fields.description, res);
    let name = fields.name;

    if (files.image) this.setImage(name, files.image.newFilename);
    let image = this.getImage(name, fields.description, fields.gallery);

    ImageModel
      .findByIdAndUpdate(req.params.id, { ...image, _id: req.params.id })
      .then(() => {
        if (files.image) fs.unlink(GALLERIES_IMG + files.image.newFilename, () => {});
        res.status(200).json({ message: process.env.IMAGE_UPDATED });
      })
      .catch(() => res.status(400).json({ message: process.env.IMAGE_NOT_UPDATED }));
  })
};

/**
 * DELETE IMAGE
 * @param {object} req 
 * @param {object} res 
 */
exports.deleteImage = (req, res) => {
  ImageModel
    .findById(req.params.id)
    .then((image) => {
      fs.unlink(GALLERIES_THUMB + image.name, () => {
        fs.unlink(GALLERIES_IMG + image.name, () => {

          ImageModel
            .findByIdAndDelete(req.params.id)
            .then(() => res.status(204).json({ message: process.env.IMAGE_DELETED }))
            .catch(() => res.status(400).json({ message: process.env.IMAGE_NOT_DELETED }));
        })
      })
    })
    .catch(() => res.status(400).json({ message: process.env.IMAGE_NOT_FOUND }));
};
