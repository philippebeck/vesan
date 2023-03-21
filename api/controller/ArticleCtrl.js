"use strict";

const formidable  = require("formidable");
const fs          = require("fs");
const nem         = require("nemjs");

const ArticleModel  = require("../model/ArticleModel");
const CommentModel  = require("../model/CommentModel");
const UserModel     = require("../model/UserModel");

require("dotenv").config();

const ARTICLES_IMG = process.env.IMG_URL + "articles/";
const ARTICLES_THUMB = process.env.THUMB_URL + "articles/";
const form = formidable({ uploadDir: ARTICLES_IMG, keepExtensions: true });

//! ****************************** CHECKERS ******************************

/**
 * CHECK ARTICLE DATA
 * @param {string} name 
 * @param {string} text 
 * @param {string} alt 
 * @param {string} cat 
 * @param {object} res 
 */
exports.checkArticleData = (name, text, alt, cat, res) => {
  let alert = "";

  if (!nem.checkString(cat)) { alert = process.env.CHECK_CAT }
  if (!nem.checkString(alt)) { alert = process.env.CHECK_NAME }
  if (!nem.checkString(text, process.env.TEXT_MIN, process.env.TEXT_MAX)) { alert = process.env.CHECK_TEXT }
  if (!nem.checkString(name)) { alert = process.env.CHECK_NAME }

  if (alert !== "") { 
    return res.status(403).json({ message: alert }) 
  }
}

/**
 * CHECK ARTICLE UNIQUE
 * @param {string} name 
 * @param {string} text 
 * @param {object} article 
 * @param {object} res 
 * @returns
 */
exports.checkArticleUnique = (name, text, article, res) => {
  if (article.name === name) {
    return res.status(403).json({ message: process.env.DISPO_NAME });
  }

  if (article.text === text) {
    return res.status(403).json({ message: process.env.DISPO_TEXT });
  }
}

//! ****************************** GETTERS ******************************

/**
 * GET ARTICLE CREATED
 * @param {string} name 
 * @param {string} text 
 * @param {string} image 
 * @param {string} alt 
 * @param {string} user 
 * @param {array} likes 
 * @param {string} cat 
 * @param {string} created 
 * @param {string} updated 
 * @returns 
 */
exports.getArticleCreated = (name, text, image, alt, user, likes, cat, created, updated) => {

  return {
    name: name,
    text: text,
    image: image,
    alt: alt,
    user: user,
    likes: likes,
    cat: cat,
    created: created,
    updated: updated
  }
}

/**
 * GET ARTICLE UPDATED
 * @param {string} name 
 * @param {string} text 
 * @param {string} image 
 * @param {string} alt 
 * @param {array} likes 
 * @param {string} cat 
 * @param {string} updated 
 * @returns 
 */
exports.getArticleUpdated = (name, text, image, alt, likes, cat, updated) => {

  return {
    name: name,
    text: text,
    image: image,
    alt: alt,
    likes: likes,
    cat: cat,
    updated: updated
  }
}

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

  nem.setImage( "articles/" + newFilename, "articles/" + image);
  nem.setThumbnail("articles/" + newFilename, "articles/" + image);

  ArticleModel
    .findById(id)
    .then((article) => 
      fs.unlink(ARTICLES_THUMB + article.image, () => {
        fs.unlink(ARTICLES_IMG + article.image, () => {
          fs.unlink(ARTICLES_IMG + newFilename, () => {})
        })
      })
    )
    .catch(() => res.status(404).json({ message: process.env.ARTICLE_NOT_FOUND }));

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
    .then((articles) => {

      UserModel
        .find()
        .then((users) => {

          articles = nem.getArrayWithUsername(articles, users);
          res.status(200).json(articles);
        })
      .catch(() => res.status(404).json({ message: process.env.USERS_NOT_FOUND }));
    })
    .catch(() => res.status(404).json({ message: process.env.ARTICLES_NOT_FOUND }));
}

/**
 * READ A ARTICLE
 * @param {object} req 
 * @param {object} res 
 */
exports.readArticle = (req, res) => {
  ArticleModel
  .findById(req.params.id)
  .then((article) => {

    UserModel
      .findById(article.user)
      .then((user) => {
        article.user = user.name;
        res.status(200).json(article);
      })
      .catch(() => res.status(404).json({ message: process.env.USER_NOT_FOUND }));
  })
  .catch(() => res.status(404).json({ message: process.env.ARTICLE_NOT_FOUND }));
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
    if (err) { next(err); return }

    this.checkArticleData(fields.name, fields.text, fields.alt, fields.cat, res);

    ArticleModel
      .find()
      .then((articles) => {
        for (let article of articles) { this.checkArticleUnique(fields.name, fields.text, article, res) }

        let likes = nem.getArrayFromString(fields.likes);
        let image = nem.getImageName(fields.name);

        nem.setImage("articles/" + files.image.newFilename, "articles/" + image);
        nem.setThumbnail("articles/" + files.image.newFilename, "articles/" + image);

        let article = new ArticleModel(this.getArticleCreated(
          fields.name, fields.text, image, fields.alt, fields.user, likes, fields.cat, fields.created, fields.updated
        ));

        article
          .save()
          .then(() => fs.unlink(ARTICLES_IMG + files.image.newFilename, () => {}))
          .then(() => res.status(201).json({ message: process.env.ARTICLE_CREATED }))
          .catch(() => res.status(400).json({ message: process.env.ARTICLE_NOT_CREATED }));
      })
      .catch(() => res.status(404).json({ message: process.env.ARTICLES_NOT_FOUND }));
  })
}

/**
 * UPDATE ARTICLE
 * @param {object} req 
 * @param {object} res 
 * @param {function} next 
 */
exports.updateArticle = (req, res, next) => {
  form.parse(req, (err, fields, files) => {
    if (err) { next(err); return }

    this.checkArticleData(fields.name, fields.text, fields.alt, fields.cat, res);

    ArticleModel
      .find()
      .then((articles) => {
        for (let article of articles) {
          if (!article._id.equals(req.params.id)) { this.checkArticleUnique(fields.name, fields.text, article, res) }
        }

        let image = fields.image;
        if (Object.keys(files).length !== 0) { image = this.getImageUpdated(req.params.id, fields.name, files.image.newFilename, res) }

        let likes   = nem.getArrayFromString(fields.likes);
        let article = this.getArticleUpdated(fields.name, fields.text, image, fields.alt, likes, fields.cat, fields.updated);

        ArticleModel
          .findByIdAndUpdate(req.params.id, { ...article, _id: req.params.id })
          .then(() => res.status(200).json({ message: process.env.ARTICLE_UPDATED }))
          .catch(() => res.status(400).json({ message: process.env.ARTICLE_NOT_UPDATED }));
      })
      .catch(() => res.status(404).json({ message: process.env.ARTICLES_NOT_FOUND }));
  })
}

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
                .then(() => res.status(204).json({ message: process.env.ARTICLE_DELETED }))
                .catch(() => res.status(400).json({ message: process.env.ARTICLE_NOT_DELETED }))
            )
            .catch(() => res.status(400).json({ message: process.env.COMMENT_DELETE_MANY }));
        });
      })
    })
    .catch(() => res.status(404).json({ message: process.env.ARTICLE_NOT_FOUND }));
}
