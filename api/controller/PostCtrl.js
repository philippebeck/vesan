"use strict";

const formidable  = require("formidable");
const fs          = require("fs");
const nem         = require("nemjs");
const accents     = require("remove-accents");

const PostModel = require("../model/PostModel");

require("dotenv").config();

const postsUrl = process.env.IMG_URL + "posts/";
const form = formidable({ 
  uploadDir: postsUrl, 
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
 * GET POST
 * @param {string} title 
 * @param {string} text 
 * @param {string} image 
 * @param {string} alt 
 * @param {string} cat 
 * @param {string} user 
 * @param {string} created 
 * @param {string} updated 
 * @param {number} likes 
 * @param {array} usersLiked 
 * @returns 
 */
exports.getPost = (title, text, image, alt, cat, user, created, updated, likes, usersLiked) => {

  return {
    title: title,
    text: text,
    image: image,
    alt: alt,
    cat: cat,
    user: user,
    created: created,
    updated: updated,
    likes: likes,
    usersLiked: usersLiked
  }
}

/**
 * LIST POSTS
 * @param {object} req 
 * @param {object} res 
 */
exports.listPosts = (req, res) => {
  PostModel
    .find()
    .then((posts) => res.status(200).json(posts))
    .catch((error) => res.status(400).json({ error }));
};

//! ****************************** CRUD ******************************

/**
 * CREATE POST
 * @param {object} req 
 * @param {object} res 
 * @param {function} next 
 */
exports.createPost = (req, res, next) => {
  form.parse(req, (err, fields, files) => {

    if (err) {
      next(err);
      return;
    }

    let image = this.getImgName(fields.title);

    nem.createImage(
      "posts/" + files.image.newFilename, 
      "posts/" + image
    );

    let post  = new PostModel(this.getPost(
      fields.title, 
      fields.text, 
      image, 
      fields.alt, 
      fields.cat, 
      fields.user,
      fields.created,
      fields.updated,
      fields.likes,
      fields.usersLiked,
    ));

    post
      .save()
      .then(() => fs.unlink(postsUrl + files.image.newFilename, () => {
        console.log("image ok !");
      }))
      .then(() => res.status(201).json({ message: process.env.POST_CREATED }))
      .catch((error) => res.status(400).json({ error }));
  })
};

/**
 * READ A POST
 * @param {object} req 
 * @param {object} res 
 */
exports.readPost = (req, res) => {
  PostModel
  .findOne({ _id: req.params.id })
  .then((post) => res.status(200).json(post))
  .catch((error) => res.status(400).json({ error }));
}

/**
 * UPDATE POST
 * @param {object} req 
 * @param {object} res 
 * @param {function} next 
 */
exports.updatePost = (req, res, next) => {
  form.parse(req, (err, fields, files) => {

    if (err) {
      next(err);
      return;
    }

    let image = fields.image;

    if (Object.keys(files).length !== 0) {
      image = this.getImgName(fields.title);

      nem.createImage(
        "posts/" + files.image.newFilename, 
        "posts/" + image
      );

      PostModel
        .findOne({ _id: req.params.id })
        .then((post) => 
          fs.unlink(postsUrl + post.image, () => {
            fs.unlink(postsUrl + files.image.newFilename, () => {
              console.log("Image ok !");
            })
          })
        )
    }

    let usersLiked = fields.usersLiked.split(",");

    if (usersLiked[0] === "") {
      usersLiked.shift();
    }

    let post = this.getPost(
      fields.title, 
      fields.text, 
      image, 
      fields.alt, 
      fields.cat, 
      fields.user,
      fields.created,
      fields.updated,
      fields.likes,
      usersLiked
    );

    PostModel
      .updateOne({ _id: req.params.id }, { ...post, _id: req.params.id })
      .then(() => res.status(200).json({ message: process.env.POST_UPDATED }))
      .catch((error) => res.status(400).json({ error }));
  })
};

/**
 * DELETE POST
 * @param {object} req 
 * @param {object} res 
 */
exports.deletePost = (req, res) => {
  PostModel
    .findOne({ _id: req.params.id })
    .then(post => {
      fs.unlink(postsUrl + post.image, () => {
        PostModel
          .deleteOne({ _id: req.params.id })
          .then(() => res.status(200).json({ message: process.env.POST_DELETED }))
          .catch((error) => res.status(400).json({ error }));
      });
    })
    .catch(error => res.status(500).json({ error }));
};
