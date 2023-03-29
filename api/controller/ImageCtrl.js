"use strict";

const formidable  = require("formidable");
const nem         = require("nemjs");
const ImageModel  = require("../model/ImageModel");

require("dotenv").config();

const GALLERIES_IMG = process.env.IMG_URL + "galleries/";
const GALLERIES_THUMB = process.env.THUMB_URL + "galleries/";
const form = formidable({ uploadDir: GALLERIES_IMG, keepExtensions: true });

//! ****************************** CHECKER ******************************

/**
 * CHECK IMAGE DATA
 * @param {string} legend 
 * @param {object} res 
 */
exports.checkImageData = (legend, res) => {
  if (!nem.checkString(legend)) {
    return res.status(403).json({ message: process.env.CHECK_NAME });
  }
}

//! ****************************** GETTER ******************************

/**
 * GET IMAGE UPDATED
 * @param {string} id 
 * @param {string} name 
 * @param {string} newFilename 
 * @param {object} res 
 * @returns 
 */
exports.getImageUpdated = (id, name, newFilename, res) => {
  let image = nem.getImageName(name);

  nem.setImage( "galleries/" + newFilename, "galleries/" + image);
  nem.setThumbnail("galleries/" + newFilename, "galleries/" + image);

  ImageModel
    .findById(id)
    .then((image) => 

      fs.unlink(GALLERIES_THUMB + image.name, () => {
        fs.unlink(GALLERIES_IMG + image.name, () => {
          fs.unlink(GALLERIES_IMG + newFilename, () => {})
        })
      })
    )
    .catch(() => res.status(404).json({ message: process.env.IMAGE_NOT_FOUND }));

  return image;
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
    .then((images) => { res.status(200).json(images) })
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
  form.parse(req, (err, fields) => {
    if (err) { next(err); return }

    this.checkImageData(fields.legend, res);
    let image = new ImageModel(fields);

    image
      .save()
      .then(() => res.status(201).json({ message: process.env.IMAGE_CREATED }))
      .catch(() => res.status(400).json({ message: process.env.IMAGE_NOT_CREATED }));
  })
};

/**
 * UPDATE IMAGE
 * @param {object} req 
 * @param {object} res 
 * @param {function} next 
 */
exports.updateImage = (req, res, next) => {
  form.parse(req, (err, fields) => {
    if (err) { next(err); return }

    this.checkImageData(fields.legend, res);

    ImageModel
      .findByIdAndUpdate(req.params.id, { ...fields, _id: req.params.id })
      .then(() => res.status(200).json({ message: process.env.IMAGE_UPDATED }))
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
    .findByIdAndDelete(req.params.id)
    .then(() => res.status(204).json({ message: process.env.IMAGE_DELETED }))
    .catch(() => res.status(400).json({ message: process.env.IMAGE_NOT_DELETED }))
};
