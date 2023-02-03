"use strict";

const formidable  = require("formidable");
const fs          = require("fs");
const nem         = require("nemjs");
const accents     = require("remove-accents");

const ArticleModel = require("../model/ArticleModel");

require("dotenv").config();

const articlesImg   = process.env.IMG_URL + "articles/";
const articlesThumb = process.env.THUMB_URL + "articles/";

const form = formidable({ 
  uploadDir: articlesImg, 
  keepExtensions: true 
});

/**
 * GET ARTICLE
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
exports.getArticle = (name, description, image, alt, price, options, cat, created, updated) => {

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

    let image = nem.getImgName(fields.name);

    nem.createImage(
      "articles/" + files.image.newFilename, 
      "articles/" + image
    );

    nem.createThumbnail(
      "articles/" + files.image.newFilename, 
      "articles/" + image
    );

    let options = fields.options.split(",");

    if (options[0] === "") {
      options.shift();
    }

    let article = new ArticleModel(
      this.getArticle(
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

    article
      .save()
      .then(() => fs.unlink(articlesImg + files.image.newFilename, () => {
        console.log("image ok !") 
      }))
      .then(() => res.status(201).json({ message: process.env.ARTICLE_CREATED }))
      .catch((error) => res.status(400).json({ error }));
  })
};

/**
 * READ AN ARTICLE
 * @param {object} req 
 * @param {object} res 
 */
exports.readArticle = (req, res) => {
  ArticleModel
  .findOne({ _id: req.params.id })
  .then((article) => res.status(200).json(article))
  .catch((error) => res.status(400).json({ error }));
}

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
      image = nem.getImgName(fields.name);
  
      nem.createImage(
        "articles/" + files.image.newFilename, 
        "articles/" + image
      );

      nem.createThumbnail(
        "articles/" + files.image.newFilename, 
        "articles/" + image
      );
      
      ArticleModel
        .findOne({ _id: req.params.id })
        .then((article) => 
          fs.unlink(articlesThumb + article.image, () => {
            fs.unlink(articlesImg + article.image, () => {
              fs.unlink(articlesImg + files.image.newFilename, () => {
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

    let article = this.getArticle(
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
      fs.unlink(articlesThumb + article.image, () => {
        fs.unlink(articlesImg + article.image, () => {
          ArticleModel
            .deleteOne({ _id: req.params.id })
            .then(() => res.status(200).json({ message: process.env.ARTICLE_DELETED }))
            .catch((error) => res.status(400).json({ error }));
        });
      })
    })
    .catch(error => res.status(500).json({ error }));
};
