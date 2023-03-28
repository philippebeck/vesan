"use strict";

const formidable  = require("formidable");
const fs          = require("fs");
const nem         = require("nemjs");

const GalleryModel  = require("../model/GalleryModel");
const ImageModel    = require("../model/ImageModel");

require("dotenv").config();
const form = formidable();

//! ****************************** CHECKERS ******************************

/**
 * CHECK GALLERY DATA
 * @param {string} name 
 * @param {string} author 
 * @param {number} year 
 * @param {string} url 
 * @param {object} res 
 */
exports.checkGalleryData = (name, author, year, url, res) => {
  let alert = "";

  if (!nem.checkUrl(url)) { 
    alert = process.env.CHECK_URL 
  }

  if (!nem.checkNumber(year)) { 
    alert = process.env.CHECK_YEAR 
  }

  if (!nem.checkString(author)) { 
    alert = process.env.CHECK_NAME 
  }

  if (!nem.checkString(name)) { 
    alert = process.env.CHECK_NAME 
  }

  if (alert !== "") { 
    return res.status(403).json({ message: alert }) 
  }
}

/**
 * CHECK GALLERY UNIQUE
 * @param {string} name 
 * @param {string} url 
 * @param {object} gallery 
 * @param {object} res 
 * @returns
 */
exports.checkGalleryUnique = (name, url, gallery, res) => {
  if (gallery.name === name) {
    return res.status(403).json({ message: process.env.DISPO_NAME });
  }

  if (gallery.url === url) {
    return res.status(403).json({ message: process.env.DISPO_URL });
  }
}

/**
 * CHECK GALLERIES FOR UNIQUE
 * @param {string} id 
 * @param {array} galleries 
 * @param {object} fields 
 * @param {object} res 
 */
exports.checkGalleriesForUnique = (id, galleries, fields, res) => {
  for (let gallery of galleries) {
    if (!gallery._id.equals(id)) { 
      this.checkGalleryUnique(fields.name, fields.url, gallery, res) 
    }
  }
}

//! ****************************** GETTER ******************************

/**
 * GET GALLERY
 * @param {string} name 
 * @param {string} author 
 * @param {number} year 
 * @param {string} url 
 * @returns 
 */
exports.getGallery = (name, author, year, url) => {

  return {
    name: name,
    author: author,
    year: year,
    url: url
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
    .then((galleries) => {

      UserModel
        .find()
        .then((users) => {

          galleries = nem.getArrayWithUsername(galleries, users);
          res.status(200).json(galleries);
        })
      .catch(() => res.status(404).json({ message: process.env.USERS_NOT_FOUND }));
    })
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
  .then((gallery) => {

    UserModel
      .findById(gallery.user)
      .then((user) => {

        gallery.user = user.name;
        res.status(200).json(gallery);
      })
      .catch(() => res.status(404).json({ message: process.env.USER_NOT_FOUND }));
  })
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
  form.parse(req, (err, fields, files) => {
    if (err) { next(err); return }

    this.checkGalleryData(fields.name, fields.author, fields.year, fields.url, res);

    GalleryModel
      .find()
      .then((galleries) => {
        for (let gallery of galleries) { 
          this.checkGalleryUnique(fields.name, fields.author, gallery, res) 
        }

        let image = nem.getImageName(fields.name);

        nem.setThumbnail("galleries/" + files.image.newFilename, "galleries/" + image);

        let gallery = new GalleryModel(this.getGalleryCreated(
          fields.name, fields.author, fields.year, fields.url
        ));

        gallery
          .save()
          .then(() => fs.unlink(GALLERIES_IMG + files.image.newFilename, () => {}))
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
  form.parse(req, (err, fields, files) => {
    if (err) { next(err); return }

    this.checkGalleryData(fields.name, fields.text, fields.alt, fields.cat, res);

    GalleryModel
      .find()
      .then((galleries) => {
        this.checkGalleriesForUnique(req.params.id, galleries, fields, res);

        let image = fields.image;

        if (Object.keys(files).length !== 0) { 
          image = this.getImageUpdated(req.params.id, fields.name, files.image.newFilename, res) 
        }

        let gallery = this.getGalleryUpdated(
          fields.name, fields.author, fields.year, fields.url
        );

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
  GalleryModel
    .findById(req.params.id)
    .then(gallery => {
      fs.unlink(GALLERIES_THUMB + gallery.image, () => {
        fs.unlink(GALLERIES_IMG + gallery.image, () => {

          ImageModel
            .deleteMany({ gallery: req.params.id })
            .then(() =>

              GalleryModel
                .findByIdAndDelete(req.params.id)
                .then(() => res.status(204).json({ message: process.env.GALLERY_DELETED }))
                .catch(() => res.status(400).json({ message: process.env.GALLERY_NOT_DELETED }))
            )
            .catch(() => res.status(400).json({ message: process.env.IMAGE_DELETE_MANY }));
        });
      })
    })
    .catch(() => res.status(404).json({ message: process.env.GALLERY_NOT_FOUND }));
}
