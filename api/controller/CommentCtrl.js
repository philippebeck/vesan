"use strict";

const formidable    = require("formidable");
const CommentModel  = require("../model/CommentModel");
const UserModel     = require("../model/UserModel");

require("dotenv").config();
const form = formidable();

//! ****************************** PUBLIC ******************************

/**
 * LIST ARTICLE COMMENTS
 * @param {object} req 
 * @param {object} res 
 */
exports.listArticleComments = (req, res) => {
  CommentModel
    .find({ article: req.params.id })
    .then((comments) => {

      UserModel
        .find()
        .then((users) => {

          for (let comment of comments) {
            for (let user of users) {
              if (comment.user === user._id.toString()) {
                comment.user = user.name + "-" + comment.user;
              }
            }
          }
          res.status(200).json(comments);
        })
      .catch((error) => res.status(404).json({ error }));
    })
    .catch((error) => res.status(404).json({ error }));
};

//! ****************************** PRIVATE ******************************

/**
 * LIST COMMENTS
 * @param {object} req 
 * @param {object} res 
 */
exports.listComments = (req, res) => {
  CommentModel
    .find()
    .then((comments) => res.status(200).json(comments))
    .catch((error) => res.status(404).json({ error }));
};

/**
 * CREATE COMMENT
 * @param {object} req 
 * @param {object} res 
 * @param {function} next 
 */
exports.createComment = (req, res, next) => {
  form.parse(req, (err, fields) => {

    if (err) {
      next(err);
      return;
    }

    let comment = new CommentModel(fields);

    comment
      .save()
      .then(() => res.status(201).json({ message: process.env.COMMENT_CREATED }))
      .catch((error) => res.status(400).json({ error }));
  })
};

/**
 * UPDATE COMMENT
 * @param {object} req 
 * @param {object} res 
 * @param {function} next 
 */
exports.updateComment = (req, res, next) => {
  form.parse(req, (err, fields) => {

    if (err) {
      next(err);
      return;
    }

    CommentModel
      .findByIdAndUpdate(req.params.id, { ...fields, _id: req.params.id })
      .then(() => res.status(200).json({ message: process.env.COMMENT_UPDATED }))
      .catch((error) => res.status(400).json({ error }));
  })
};

/**
 * DELETE COMMENT
 * @param {object} req 
 * @param {object} res 
 */
exports.deleteComment = (req, res) => {
  CommentModel
    .findByIdAndDelete(req.params.id)
    .then(() => res.status(204).json({ message: process.env.COMMENT_DELETED }))
    .catch((error) => res.status(400).json({ error }))
};
