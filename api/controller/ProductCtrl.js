"use strict";

const formidable  = require("formidable");
const fs          = require("fs");
const nem         = require("nemjs");

const ProductModel  = require("../model/ProductModel");
const ReviewModel   = require("../model/ReviewModel");

require("dotenv").config();

const PRODUCTS_IMG = process.env.IMG_URL + "products/";
const PRODUCTS_THUMB = process.env.THUMB_URL + "products/";
const form = formidable({ uploadDir: PRODUCTS_IMG, keepExtensions: true });

/**
 * CHECK PRODUCT DATA
 * @param {string} name 
 * @param {string} description 
 * @param {string} alt 
 * @param {number} price 
 * @param {string} cat 
 * @param {object} res 
 */
exports.checkProductData = (name, description, alt, price, cat, res) => {
  if (!nem.checkName(name)) {
    return res.status(403).json({ message: process.env.CHECK_NAME });
  }

  if (!nem.checkText(description)) {
    return res.status(403).json({ message: process.env.CHECK_TEXT });
  }

  if (!nem.checkText(alt)) {
    return res.status(403).json({ message: process.env.CHECK_TEXT });
  }

  if (price < 1) {
    return res.status(403).json({ message: process.env.CHECK_PRICE });
  }

  if (cat === "") {
    return res.status(403).json({ message: process.env.CHECK_CAT });
  }
}

/**
 * CHECK PRODUCT UNIQUE
 * @param {string} name 
 * @param {string} description 
 * @param {object} product 
 * @param {object} res 
 * @returns
 */
exports.checkProductUnique = (name, description, product, res) => {
  if (product.name === name) {
    return res.status(403).json({ message: process.env.DISPO_NAME });
  }

  if (product.description === description) {
    return res.status(403).json({ message: process.env.DISPO_DESCRIPTION });
  }
}

/**
 * GET PRODUCT
 * @param {string} name 
 * @param {string} description 
 * @param {string} image 
 * @param {string} alt 
 * @param {number} price 
 * @param {array} options 
 * @param {string} cat 
 * @param {string} created 
 * @param {string} updated 
 * @returns 
 */
exports.getProduct = (name, description, image, alt, price, options, cat, created, updated) => {

  return {
    name: name,
    description: description,
    image: image,
    alt: alt,
    price: price,
    options: options,
    cat: cat,
    created: created,
    updated: updated
  }
}

/**
 * UPDATE IMAGE
 * @param {string} id 
 * @param {string} name 
 * @param {string} newFilename 
 * @returns 
 */
exports.updateImage = (id, name, newFilename) => {
  let image = nem.getImgName(name);
  nem.createImage("products/" + newFilename, "products/" + image);
  nem.createThumbnail("products/" + newFilename, "products/" + image);
  
  ProductModel
    .findById(id)
    .then((product) => 
      fs.unlink(PRODUCTS_THUMB + product.image, () => {
        fs.unlink(PRODUCTS_IMG + product.image, () => {
          fs.unlink(PRODUCTS_IMG + newFilename, () => {
            console.log("Image ok !");
          })
        })
      })
    )
  return image;
}

//! ****************************** PUBLIC ******************************

/**
 * LIST PRODUCTS
 * @param {object} req 
 * @param {object} res 
 */
exports.listProducts = (req, res) => {
  ProductModel
    .find()
    .then((products) => res.status(200).json(products))
    .catch((error) => res.status(404).json({ error }));
};

/**
 * READ AN PRODUCT
 * @param {object} req 
 * @param {object} res 
 */
exports.readProduct = (req, res) => {
  ProductModel
  .findById(req.params.id)
  .then((product) => res.status(200).json(product))
  .catch((error) => res.status(404).json({ error }));
}

//! ****************************** PRIVATE ******************************

/**
 * CREATE PRODUCT
 * @param {object} req 
 * @param {object} res 
 * @param {function} next 
 */
exports.createProduct = (req, res, next) => {
  form.parse(req, (err, fields, files) => {

    if (err) {
      next(err);
      return;
    }

    this.checkProductData(fields.name, fields.description, fields.alt, fields.price, fields.cat, res);

    ProductModel
      .find()
      .then((products) => {
        for (let product of products) {
          this.checkProductUnique(fields.name, fields.description, product, res);
        }

        let options = nem.stringToArray(fields.options);
        let image   = nem.getImgName(fields.name);

        nem.createImage("products/" + files.image.newFilename, "products/" + image);
        nem.createThumbnail("products/" + files.image.newFilename, "products/" + image);

        let product = new ProductModel(this.getProduct(
          fields.name, fields.description, image, fields.alt, fields.price, options, fields.cat, fields.created, fields.updated
        ));

        product
          .save()
          .then(() => fs.unlink(PRODUCTS_IMG + files.image.newFilename, () => { console.log("image ok !") }))
          .then(() => res.status(201).json({ message: process.env.PRODUCT_CREATED }))
          .catch((error) => res.status(400).json({ error }));
      })
      .catch((error) => res.status(404).json({ error }));
  })
};

/**
 * UPDATE PRODUCT
 * @param {object} req 
 * @param {object} res 
 * @param {function} next 
 */
exports.updateProduct = (req, res, next) => {
  form.parse(req, (err, fields, files) => {

    if (err) {
      next(err);
      return;
    }

    this.checkProductData(fields.name, fields.description, fields.alt, fields.price, fields.cat, res);

    ProductModel
      .find()
      .then((products) => {
        for (let product of products) {

          if (!product._id.equals(req.params.id)) {
            this.checkProductUnique(fields.name, fields.description, product, res);
          }
        }

        let options = nem.stringToArray(fields.options);
        let image   = fields.image;
    
        if (Object.keys(files).length !== 0) {
          image = this.updateImage(req.params.id, fields.name, files.image.newFilename);
        }
    
        let product = this.getProduct(
          fields.name, fields.description, image, fields.alt, fields.price, options, fields.cat, fields.created, fields.updated
        );
    
        ProductModel
          .findByIdAndUpdate(req.params.id, { ...product, _id: req.params.id })
          .then(() => res.status(200).json({ message: process.env.PRODUCT_UPDATED }))
          .catch((error) => res.status(400).json({ error }));
      })
      .catch((error) => res.status(404).json({ error }));
  })
};

/**
 * DELETE PRODUCT
 * @param {object} req 
 * @param {object} res 
 */
exports.deleteProduct = (req, res) => {
  ProductModel
    .findById(req.params.id)
    .then(product => {
      fs.unlink(PRODUCTS_THUMB + product.image, () => {
        fs.unlink(PRODUCTS_IMG + product.image, () => {

          ReviewModel
            .deleteMany({ product: req.params.id })
            .then(() => 
              ProductModel
                .findByIdAndDelete(req.params.id)
                .then(() => res.status(204).json({ message: process.env.PRODUCT_DELETED }))
                .catch((error) => res.status(400).json({ error }))
            )
            .catch((error) => res.status(400).json({ error }))
        })
      })
    })
    .catch(error => res.status(404).json({ error }));
}
