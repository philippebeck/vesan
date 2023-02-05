"use strict";

const formidable  = require("formidable");
const fs          = require("fs");
const nem         = require("nemjs");
const accents     = require("remove-accents");

const ProductModel  = require("../model/ProductModel");
const ReviewModel   = require("../model/ReviewModel");

require("dotenv").config();

const productsImg   = process.env.IMG_URL + "products/";
const productsThumb = process.env.THUMB_URL + "products/";

const form = formidable({ 
  uploadDir: productsImg, 
  keepExtensions: true 
});

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
    .catch((error) => res.status(400).json({ error }));
};

/**
 * READ AN PRODUCT
 * @param {object} req 
 * @param {object} res 
 */
exports.readProduct = (req, res) => {
  ProductModel
  .findOne({ _id: req.params.id })
  .then((product) => res.status(200).json(product))
  .catch((error) => res.status(400).json({ error }));
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

    let image = nem.getImgName(fields.name);

    nem.createImage(
      "products/" + files.image.newFilename, 
      "products/" + image
    );

    nem.createThumbnail(
      "products/" + files.image.newFilename, 
      "products/" + image
    );

    let options = fields.options.split(",");

    if (options[0] === "") {
      options.shift();
    }

    let product = new ProductModel(
      this.getProduct(
        fields.name, 
        fields.description, 
        image, 
        fields.alt,
        fields.price,
        options,
        fields.cat, 
        fields.created,
        fields.updated
      ));

    product
      .save()
      .then(() => fs.unlink(productsImg + files.image.newFilename, () => {
        console.log("image ok !") 
      }))
      .then(() => res.status(201).json({ message: process.env.PRODUCT_CREATED }))
      .catch((error) => res.status(400).json({ error }));
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

    let image = fields.image;

    if (Object.keys(files).length !== 0) {
      image = nem.getImgName(fields.name);
  
      nem.createImage(
        "products/" + files.image.newFilename, 
        "products/" + image
      );

      nem.createThumbnail(
        "products/" + files.image.newFilename, 
        "products/" + image
      );
      
      ProductModel
        .findOne({ _id: req.params.id })
        .then((product) => 
          fs.unlink(productsThumb + product.image, () => {
            fs.unlink(productsImg + product.image, () => {
              fs.unlink(productsImg + files.image.newFilename, () => {
                console.log("Image ok !");
              })
            })
          })
        )
    }

    let options = fields.options.split(",");

    if (options[0] === "") {
      options.shift();
    }

    let product = this.getProduct(
      fields.name, 
      fields.description, 
      image, 
      fields.alt,
      fields.price,
      options,
      fields.cat, 
      fields.created,
      fields.updated
    );

    ProductModel
      .updateOne({ _id: req.params.id }, { ...product, _id: req.params.id })
      .then(() => res.status(200).json({ message: process.env.PRODUCT_UPDATED }))
      .catch((error) => res.status(400).json({ error }));
  })
};

/**
 * DELETE PRODUCT
 * @param {object} req 
 * @param {object} res 
 */
exports.deleteProduct = (req, res) => {
  ProductModel
    .findOne({ _id: req.params.id })
    .then(product => {
      fs.unlink(productsThumb + product.image, () => {
        fs.unlink(productsImg + product.image, () => {

          ReviewModel
            .deleteMany({ product: req.params.id })
            .then(() => 
              ProductModel
                .deleteOne({ _id: req.params.id })
                .then(() => res.status(200).json({ message: process.env.PRODUCT_DELETED }))
                .catch((error) => res.status(400).json({ error }))
            )
            .catch((error) => res.status(400).json({ error }))
        })
      })
    })
    .catch(error => res.status(500).json({ error }));
}
