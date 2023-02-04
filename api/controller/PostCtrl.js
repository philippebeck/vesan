"use strict";

const formidable  = require("formidable");
const fs          = require("fs");
const nem         = require("nemjs");
const accents     = require("remove-accents");

const PostModel     = require("../model/PostModel");
const CommentModel  = require("../model/CommentModel");

require("dotenv").config();

const postsImg    = process.env.IMG_URL + "posts/";
const postsThumb  = process.env.THUMB_URL + "posts/";

const form = formidable({ 
  uploadDir: postsImg, 
  keepExtensions: true 
});

/**
 * GET POST
 * @param {string} title 
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
exports.getPost = (title, text, image, alt, user, likes, usersLiked, cat, created, updated) => {

  return {
    title: title,
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

    let image = nem.getImgName(fields.title);

    nem.createImage(
      "posts/" + files.image.newFilename, 
      "posts/" + image
    );

    nem.createThumbnail(
      "posts/" + files.image.newFilename, 
      "posts/" + image
    );

    let post  = new PostModel(this.getPost(
      fields.title, 
      fields.text, 
      image, 
      fields.alt, 
      fields.user,
      fields.likes,
      fields.usersLiked,
      fields.cat, 
      fields.created,
      fields.updated

    ));

    post
      .save()
      .then(() => fs.unlink(postsImg + files.image.newFilename, () => {
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
      image = nem.getImgName(fields.title);

      nem.createImage(
        "posts/" + files.image.newFilename, 
        "posts/" + image
      );

    nem.createThumbnail(
      "posts/" + files.image.newFilename, 
      "posts/" + image
    );

      PostModel
        .findOne({ _id: req.params.id })
        .then((post) => 
          fs.unlink(postsThumb + post.image, () => {
            fs.unlink(postsImg + post.image, () => {
              fs.unlink(postsImg + files.image.newFilename, () => {
                console.log("Image ok !");
              })
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
      fields.user,
      fields.likes,
      usersLiked,
      fields.cat, 
      fields.created,
      fields.updated
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
      fs.unlink(postsThumb + post.image, () => {
        fs.unlink(postsImg + post.image, () => {

          CommentModel
            .deleteMany({ post: req.params.id })
            .then(() => 
              PostModel
                .deleteOne({ _id: req.params.id })
                .then(() => res.status(200).json({ message: process.env.POST_DELETED }))
                .catch((error) => res.status(400).json({ error }))
            )
            .catch(error => res.status(500).json({ error }));
        });
      })
    })
    .catch(error => res.status(500).json({ error }));
};
