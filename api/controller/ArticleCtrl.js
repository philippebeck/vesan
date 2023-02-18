"use strict";

const formidable  = require("formidable");
const fs          = require("fs");
const nem         = require("nemjs");

const ArticleModel  = require("../model/ArticleModel");
const CommentModel  = require("../model/CommentModel");

require("dotenv").config();

const ARTICLES_IMG = process.env.IMG_URL + "articles/";
const ARTICLES_THUMB = process.env.THUMB_URL + "articles/";
const form = formidable({ uploadDir: ARTICLES_IMG, keepExtensions: true });

/**
 * GET ARTICLE
 * @param {string} name 
 * @param {string} text 
 * @param {string} image 
 * @param {string} alt 
 * @param {string} user 
 * @param {number} likes 
 * @param {array} usersLiked 
 * @param {string} cat 
 * @param {string} created 
 * @param {string} updated 
 * @returns 
 */
exports.getArticle = (name, text, image, alt, user, likes, usersLiked, cat, created, updated) => {

  return {
    name: name,
    text: text,
    image: image,
    alt: alt,
    user: user,
    likes: likes,
    usersLiked: usersLiked,
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
  nem.createImage( "articles/" + newFilename, "articles/" + image);
  nem.createThumbnail("articles/" + newFilename, "articles/" + image);

  ArticleModel
    .findById(id)
    .then((article) => 
      fs.unlink(ARTICLES_THUMB + article.image, () => {
        fs.unlink(ARTICLES_IMG + article.image, () => {
          fs.unlink(ARTICLES_IMG + newFilename, () => {
            console.log("Image ok !");
          })
        })
      })
    )
  return image;
}

//! ****************************** PUBLIC ******************************

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

/**
 * READ A ARTICLE
 * @param {object} req 
 * @param {object} res 
 */
exports.readArticle = (req, res) => {
  ArticleModel
  .findById(req.params.id)
  .then((article) => res.status(200).json(article))
  .catch((error) => res.status(400).json({ error }));
}

//! ****************************** PRIVATE ******************************

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
    nem.createImage("articles/" + files.image.newFilename, "articles/" + image);
    nem.createThumbnail("articles/" + files.image.newFilename, "articles/" + image);

    let article  = new ArticleModel(this.getArticle(
      fields.name, fields.text, image, fields.alt, fields.user, fields.likes, fields.usersLiked, fields.cat, fields.created, fields.updated
    ));

    article
      .save()
      .then(() => fs.unlink(ARTICLES_IMG + files.image.newFilename, () => { console.log("image ok !") }))
      .then(() => res.status(201).json({ message: process.env.ARTICLE_CREATED }))
      .catch((error) => res.status(400).json({ error }));
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
      image = this.updateImage(req.params.id, fields.name, files.image.newFilename);
    }

    let usersLiked = fields.usersLiked.split(",");
    if (usersLiked[0] === "") { usersLiked.shift() }

    let article = this.getArticle(
      fields.name, fields.text, image, fields.alt, fields.user, fields.likes, usersLiked, fields.cat, fields.created, fields.updated
    );

    ArticleModel
      .findByIdAndUpdate(req.params.id, { ...article, _id: req.params.id })
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
    .findById(req.params.id)
    .then(article => {
      fs.unlink(ARTICLES_THUMB + article.image, () => {
        fs.unlink(ARTICLES_IMG + article.image, () => {

          CommentModel
            .deleteMany({ article: req.params.id })
            .then(() => 
              ArticleModel
                .findByIdAndDelete(req.params.id)
                .then(() => res.status(200).json({ message: process.env.ARTICLE_DELETED }))
                .catch((error) => res.status(400).json({ error }))
            )
            .catch(error => res.status(500).json({ error }));
        });
      })
    })
    .catch(error => res.status(500).json({ error }));
};
