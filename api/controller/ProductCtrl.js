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

//! ****************************** CHECKERS ******************************

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
  const PRICE_MAX = process.env.PRICE_MAX;
  const PRICE_MIN = process.env.PRICE_MIN;
  const STR_MAX   = process.env.STRING_MAX;
  const STR_MIN   = process.env.STRING_MIN;
  const TXT_MAX   = process.env.TEXT_MAX;
  const TXT_MIN   = process.env.TEXT_MIN;

  let alert = "";

  if (!nem.checkRange(cat, STR_MIN, STR_MAX)) alert = process.env.CHECK_CAT;
  if (!nem.checkRange(price, PRICE_MIN, PRICE_MAX)) alert = process.env.CHECK_PRICE;
  if (!nem.checkRange(alt, STR_MIN, STR_MAX)) alert = process.env.CHECK_NAME; 
  if (!nem.checkRange(description, TXT_MIN, TXT_MAX)) alert = process.env.CHECK_TEXT;
  if (!nem.checkRange(name, STR_MIN, STR_MAX)) alert = process.env.CHECK_NAME;

  if (alert !== "") return res.status(403).json({ message: alert });
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
 * CHECK PRODUCTS FOR UNIQUE
 * @param {string} id 
 * @param {array} products 
 * @param {object} fields 
 * @param {object} res 
 */
exports.checkProductsForUnique = (id, products, fields, res) => {
  for (let product of products) {
    if (!product._id.equals(id)) { 
      this.checkProductUnique(fields.name, fields.description, product, res) 
    }
  }
}

//! ****************************** GETTERS ******************************

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

//! ****************************** SETTER ******************************

/**
 * SET IMAGE
 * @param {string} name 
 * @param {string} newFilename 
 */
exports.setImage = (name, newFilename) => {
  let input   = "products/" + newFilename;
  let output  = "products/" + name;

  nem.setThumbnail(input, process.env.THUMB_URL + output);
  nem.setThumbnail(
    input, 
    process.env.IMG_URL + output, 
    process.env.IMG_WIDTH, 
    process.env.IMG_HEIGHT
  );
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
    .catch(() => res.status(404).json({ message: process.env.PRODUCTS_NOT_FOUND }));
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
  .catch(() => res.status(404).json({ message: process.env.PRODUCT_NOT_FOUND }));
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
    if (err) { next(err); return }

    this.checkProductData(fields.name, fields.description, fields.alt, fields.price, fields.cat, res);

    ProductModel
      .find()
      .then((products) => {
        for (let product of products) { this.checkProductUnique(fields.name, fields.description, product, res) }

        let options = nem.getArrayFromString(fields.options);
        let image   = nem.getName(fields.name) + "." + process.env.IMG_EXT;
        this.setImage(image, files.image.newFilename);

        let product = new ProductModel(this.getProduct(
          fields.name, fields.description, image, fields.alt, fields.price, options, fields.cat, fields.created, fields.updated
        ));

        product
          .save()
          .then(() => {
            fs.unlink(PRODUCTS_IMG + files.image.newFilename, () => {
              res.status(201).json({ message: process.env.PRODUCT_CREATED })
            })
          })
          .catch(() => res.status(400).json({ message: process.env.PRODUCT_NOT_CREATED }));
      })
      .catch(() => res.status(404).json({ message: process.env.PRODUCTS_NOT_FOUND }));
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
    if (err) { next(err); return }

    this.checkProductData(fields.name, fields.description, fields.alt, fields.price, fields.cat, res);

    ProductModel
      .find()
      .then((products) => {
        this.checkProductsForUnique(req.params.id, products, fields, res);

        let image = nem.getName(fields.name) + "." + process.env.IMG_EXT;
        if (files.image) this.setImage(image, files.image.newFilename);

        let options = nem.getArrayFromString(fields.options);
        let product = this.getProduct(fields.name, fields.description, image, fields.alt, fields.price, options, fields.cat, fields.created, fields.updated);

        ProductModel
          .findByIdAndUpdate(req.params.id, { ...product, _id: req.params.id })
          .then(() => {
            if (files.image) fs.unlink(PRODUCTS_IMG + files.image.newFilename, () => {});
            res.status(200).json({ message: process.env.PRODUCT_UPDATED });
          })
          .catch(() => res.status(400).json({ message: process.env.PRODUCT_NOT_UPDATED }));
      })
      .catch(() => res.status(404).json({ message: process.env.PRODUCTS_NOT_FOUND }));
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
                .catch(() => res.status(400).json({ message: process.env.PRODUCT_NOT_DELETED }))
            )
            .catch(() => res.status(400).json({ message: process.env.REVIEWS_NOT_DELETED }))
        })
      })
    })
    .catch(() => res.status(404).json({ message: process.env.PRODUCT_NOT_FOUND }));
}
