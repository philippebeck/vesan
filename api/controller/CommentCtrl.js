"use strict";

const formidable = require("formidable");

const CommentModel = require("../model/CommentModel");

require("dotenv").config();

const form = formidable();

//! ****************************** PUBLIC ******************************

/**
 * LIST COMMENTS
 * @param {object} req 
 * @param {object} res 
 */
exports.listComments = (req, res) => {
  CommentModel
    .find()
    .then((comments) => res.status(200).json(comments))
    .catch((error) => res.status(400).json({ error }));
};

//! ****************************** PRIVATE ******************************

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
      .updateOne({ _id: req.params.id }, { ...fields, _id: req.params.id })
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
    .deleteOne({ _id: req.params.id })
    .then(() => res.status(200).json({ message: process.env.COMMENT_DELETED }))
    .catch((error) => res.status(400).json({ error }))
};
