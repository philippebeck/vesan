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

/**
 * CHECK ARTICLE DATA
 * @param {string} name 
 * @param {string} text 
 * @param {string} alt 
 * @param {string} cat 
 * @param {object} res 
 */
exports.checkArticleData = (name, text, alt, cat, res) => {
  if (!nem.checkName(name)) {
    return res.status(403).json({ message: process.env.CHECK_NAME });
  }

  if (!nem.checkText(text)) {
    return res.status(403).json({ message: process.env.CHECK_TEXT });
  }

  if (!nem.checkText(alt)) {
    return res.status(403).json({ message: process.env.CHECK_TEXT });
  }

  if (cat === "") {
    return res.status(403).json({ message: process.env.CHECK_CAT });
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

/**
 * GET ARTICLE
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
exports.getArticle = (name, text, image, alt, user, likes, cat, created, updated) => {

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
    .catch((error) => res.status(404).json({ error }));
};

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
      .catch((error) => res.status(404).json({ error }));
  })
  .catch((error) => res.status(404).json({ error }));
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

    this.checkArticleData(fields.name, fields.text, fields.alt, fields.cat, res);

    ArticleModel
      .find()
      .then((articles) => {
        for (let article of articles) {
          this.checkArticleUnique(fields.name, fields.text, article, res);
        }

        let image = nem.getImgName(fields.name);

        nem.createImage("articles/" + files.image.newFilename, "articles/" + image);
        nem.createThumbnail("articles/" + files.image.newFilename, "articles/" + image);

        let article  = new ArticleModel(this.getArticle(
          fields.name, fields.text, image, fields.alt, fields.user, fields.likes, fields.cat, fields.created, fields.updated
        ));

        article
          .save()
          .then(() => fs.unlink(ARTICLES_IMG + files.image.newFilename, () => { console.log("image ok !") }))
          .then(() => res.status(201).json({ message: process.env.ARTICLE_CREATED }))
          .catch((error) => res.status(400).json({ error }));
      })
      .catch((error) => res.status(404).json({ error }));
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

    this.checkArticleData(fields.name, fields.text, fields.alt, fields.cat, res);

    ArticleModel
      .find()
      .then((articles) => {
        for (let article of articles) {

          if (!article._id.equals(req.params.id)) {
            this.checkArticleUnique(fields.name, fields.text, article, res);
          }
        }

        let likes = nem.stringToArray(fields.likes);
        let image = fields.image;

        if (Object.keys(files).length !== 0) {
          image = this.updateImage(req.params.id, fields.name, files.image.newFilename);
        }

        let article = this.getArticle(
          fields.name, fields.text, image, fields.alt, fields.user, likes, fields.cat, fields.created, fields.updated
        );

        ArticleModel
          .findByIdAndUpdate(req.params.id, { ...article, _id: req.params.id })
          .then(() => res.status(200).json({ message: process.env.ARTICLE_UPDATED }))
          .catch((error) => res.status(400).json({ error }));
      })
      .catch((error) => res.status(404).json({ error }));
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
                .then(() => res.status(204).json({ message: process.env.ARTICLE_DELETED }))
                .catch((error) => res.status(400).json({ error }))
            )
            .catch(error => res.status(400).json({ error }));
        });
      })
    })
    .catch(error => res.status(404).json({ error }));
};
