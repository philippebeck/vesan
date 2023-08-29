"use strict";

const formidable  = require("formidable");
const nem         = require("nemjs");

const CommentModel  = require("../model/CommentModel");
const UserModel     = require("../model/UserModel");

require("dotenv").config();
const form = formidable();

//! ****************************** CHECKER ******************************

/**
 * CHECK COMMENT DATA
 * @param {string} text 
 * @param {object} res 
 */
exports.checkCommentData = (text, res) => {
  if (!nem.checkRange(text, process.env.TEXT_MIN, process.env.TEXT_MAX)) {
    return res.status(403).json({ message: process.env.CHECK_TEXT });
  }
}

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

          comments = nem.getArrayWithUsername(comments, users);
          res.status(200).json(comments);
        })
      .catch(() => res.status(404).json({ message: process.env.USERS_NOT_FOUND }));
    })
    .catch(() => res.status(404).json({ message: process.env.COMMENTS_NOT_FOUND }));
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
    .then((comments) => {

      UserModel
        .find()
        .then((users) => {

          comments = nem.getArrayWithUsername(comments, users);
          res.status(200).json(comments);
        })
      .catch(() => res.status(404).json({ message: process.env.USERS_NOT_FOUND }));
    })
    .catch(() => res.status(404).json({ message: process.env.COMMENTS_NOT_FOUND }));
};

/**
 * CREATE COMMENT
 * @param {object} req 
 * @param {object} res 
 * @param {function} next 
 * @returns
 */
exports.createComment = (req, res, next) => {
  form.parse(req, (err, fields) => {
    if (err) { next(err); return }

    this.checkCommentData(fields.text, res);
    let comment = new CommentModel(fields);

    comment
      .save()
      .then(() => res.status(201).json({ message: process.env.COMMENT_CREATED }))
      .catch(() => res.status(400).json({ message: process.env.COMMENT_NOT_CREATED }));
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
    if (err) { next(err); return }

    this.checkCommentData(fields.text, res);

    CommentModel
      .findByIdAndUpdate(req.params.id, { ...fields, _id: req.params.id })
      .then(() => res.status(200).json({ message: process.env.COMMENT_UPDATED }))
      .catch(() => res.status(400).json({ message: process.env.COMMENT_NOT_UPDATED }));
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
    .catch(() => res.status(400).json({ message: process.env.COMMENT_NOT_DELETED }))
};
