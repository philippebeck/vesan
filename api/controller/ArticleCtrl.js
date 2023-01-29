"use strict";

const formidable  = require("formidable");
const fs          = require("fs");
const nem         = require("nemjs");
const accents     = require("remove-accents");

const ArticleModel = require("../model/ArticleModel");

require("dotenv").config();

const form = formidable({ 
  uploadDir: process.env.IMG_URL + "articles/", 
  keepExtensions: true 
});

/**
 * GET IMAGE NAME
 * @param {string} name 
 */
exports.getImgName = (name) => {

  return accents.remove(name).replace(/ /g, "-").toLowerCase() + "-" + Date.now() + "." + process.env.IMG_EXT;
}

/**
 * GET ARTICLE
 * @param {string} name 
 * @param {string} description 
 * @param {string} image 
 * @param {number} price 
 * @returns 
 */
exports.getArticle = (name, description, image, price) => {

  return {
    name: name,
    cat: cat,
    description: description,
    image: image,
    price: price
  }
}

/**
 * LIST ARTICLES
 * @param {object} req 
 * @param {object} res 
 */
exports.listArticles = (req, res) => {
  ArticleModel
    .find()
    .then((articles) => res.status(200).json(articles))
    .catch((error) => res.status(400).json({ error }));
};

//! ****************************** CRUD ******************************

/**
 * CREATE ARTICLE
 * @param {object} req 
 * @param {object} res 
 * @param {function} next 
 */
exports.createArticle = (req, res, next) => {
  form.parse(req, (err, fields, files) => {

    if (err) {
      next(err);
      return;
    }

    let image   = this.getImgName(fields.name);
    let article = new ArticleModel(this.getArticle(fields.name, fields.description, image, fields.price));

    nem.createImage("articles/" + files.image.newFilename, "articles/" + image);

    fs.unlink(process.env.IMG_URL + "articles/" + files.image.newFilename, () => {
      article
        .save()
        .then(() => res.status(201).json({ message: process.env.ARTICLE_CREATED }))
        .catch((error) => res.status(400).json({ error }));
    });
  })
};

/**
 * UPDATE ARTICLE
 * @param {object} req 
 * @param {object} res 
 * @param {function} next 
 */
exports.updateArticle = (req, res, next) => {
  form.parse(req, (err, fields, files) => {

    if (err) {
      next(err);
      return;
    }

    let image = fields.image;

    if (Object.keys(files).length !== 0) {
      image = this.getImgName(fields.name);
      nem.createImage("articles/" + files.image.newFilename, "articles/" + image);

      ArticleModel
        .findOne({ _id: req.params.id })
        .then((article) => 
          fs.unlink(process.env.IMG_URL + "articles/" + article.image, () => {
            fs.unlink(process.env.IMG_URL + "articles/" + files.image.newFilename, () => {
              console.log("Image ok !");
            })
          })
        )
    }

    let article = this.getArticle(fields.name, fields.description, image, fields.price);

    ArticleModel
      .updateOne({ _id: req.params.id }, { ...article, _id: req.params.id })
      .then(() => res.status(200).json({ message: process.env.ARTICLE_UPDATED }))
      .catch((error) => res.status(400).json({ error }));
  })
};

/**
 * DELETE ARTICLE
 * @param {object} req 
 * @param {object} res 
 */
exports.deleteArticle = (req, res) => {
  ArticleModel
    .findOne({ _id: req.params.id })
    .then(article => {
      fs.unlink(process.env.IMG_URL + "articles/" + article.image, () => {
        ArticleModel
          .deleteOne({ _id: req.params.id })
          .then(() => res.status(200).json({ message: process.env.ARTICLE_DELETED }))
          .catch((error) => res.status(400).json({ error }));
      });
    })
    .catch(error => res.status(500).json({ error }));
};
