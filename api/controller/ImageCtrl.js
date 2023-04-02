"use strict";

const formidable  = require("formidable");
const nem         = require("nemjs");
const GalleryModel = require("../model/GalleryModel");
const ImageModel  = require("../model/ImageModel");

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
  if (!nem.checkString(description)) {
    return res.status(403).json({ message: process.env.CHECK_NAME });
  }
}

//! ****************************** GETTER ******************************

/**
 * GET IMAGE
 * @param {string} name 
 * @param {string} newFilename 
 * @returns 
 */
exports.getImage = (name, newFilename) => {
  let image = nem.getImageName(name);

  let input   = "galleries/" + newFilename;
  let output  = "galleries/" + image;

  nem.setImage(input, process.env.IMG_URL + output);
  nem.setThumbnail(input, process.env.THUMB_URL + output);

  return image;
}

//! ****************************** SETTER ******************************

/**
 * UNLINK IMAGES
 * @param {string} id 
 * @param {string} newFilename 
 * @param {object} res 
 */
exports.setImagesUnlink = (id, newFilename, res) => {
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
  form.parse(req, (err, fields, files) => {
    if (err) { next(err); return }

    this.checkImageData(fields.description, res);

    GalleryModel
      .findOne({ name: fields.gallery })
      .then((gallery) => {

        ImageModel
        .find({ gallery: fields.gallery })
        .then((images) => { 
          let index = images.length + 1;

          if (index < 10) { index = "0" + index }
          let name = nem.getGalleryName(gallery.name) + "-" + index + "." + process.env.IMG_EXT;

          let input   = "galleries/" + files.image.newFilename;
          let output  = "galleries/" + name;

          nem.setImage(input, process.env.IMG_URL + output);
          nem.setThumbnail(input, process.env.THUMB_URL + output);

          let image = new ImageModel({
            name: name,
            description: fields.description,
            gallery: fields.gallery
          });

          image
            .save()
            .then(() => res.status(201).json({ message: process.env.IMAGE_CREATED }))
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
  form.parse(req, (err, fields) => {
    if (err) { next(err); return }

    this.checkImageData(fields.description, res);

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
