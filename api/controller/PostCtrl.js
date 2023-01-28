"use strict";

const formidable  = require("formidable");
const fs          = require("fs");
const nem         = require("nemjs");
const accents     = require("remove-accents");

const PostModel = require("../model/PostModel");

require("dotenv").config();

const form = formidable({ 
  uploadDir: process.env.IMG_URL + "posts/", 
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
 * @param {string} author 
 * @returns 
 */
exports.getPost = (title, text, image, author) => {

  return {
    title: title,
    text: text,
    image: image,
    author: author
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
    nem.createImage("posts/" + files.image.newFilename, "posts/" + image);

    let post = new PostModel(this.getPost(fields.title, fields.text, image, fields.author));

    fs.unlink(process.env.IMG_URL + "posts/" + files.image.newFilename, () => {
      post
        .save()
        .then(() => res.status(201).json({ message: process.env.POST_CREATED }))
        .catch((error) => res.status(400).json({ error }));
    });
  })
};

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
      nem.createImage("posts/" + files.image.newFilename, "posts/" + image);

      PostModel
        .findOne({ _id: req.params.id })
        .then((post) => 
          fs.unlink(process.env.IMG_URL + "posts/" + post.image, () => {
            fs.unlink(process.env.IMG_URL + "posts/" + files.image.newFilename, () => {
              console.log("Image ok !");
            })
          })
        )
    }

    let post = this.getPost(fields.title, fields.text, image);

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
      fs.unlink(process.env.IMG_URL + "posts/" + post.image, () => {
        PostModel
          .deleteOne({ _id: req.params.id })
          .then(() => res.status(200).json({ message: process.env.POST_DELETED }))
          .catch((error) => res.status(400).json({ error }));
      });
    })
    .catch(error => res.status(500).json({ error }));
};
