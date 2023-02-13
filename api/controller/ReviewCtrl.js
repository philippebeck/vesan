"use strict";

const formidable = require("formidable");

const ReviewModel = require("../model/ReviewModel");

require("dotenv").config();

const form = formidable();

//! ****************************** PUBLIC ******************************

/**
 * LIST PRODUCT REVIEWS
 * @param {object} req 
 * @param {object} res 
 */
exports.listProductReviews = (req, res) => {
  ReviewModel
    .find({ product: req.params.id })
    .then((reviews) => res.status(200).json(reviews))
    .catch((error) => res.status(400).json({ error }));
};

//! ****************************** PRIVATE ******************************

/**
 * LIST REVIEWS
 * @param {object} req 
 * @param {object} res 
 */
exports.listReviews = (req, res) => {
  ReviewModel
    .find()
    .then((reviews) => res.status(200).json(reviews))
    .catch((error) => res.status(400).json({ error }));
};

/**
 * CREATE REVIEW
 * @param {object} req 
 * @param {object} res 
 * @param {function} next 
 */
exports.createReview = (req, res, next) => {
  form.parse(req, (err, fields) => {

    if (err) {
      next(err);
      return;
    }

    let review = new ReviewModel(fields);

    review
      .save()
      .then(() => res.status(201).json({ message: process.env.REVIEW_CREATED }))
      .catch((error) => res.status(400).json({ error }));
  })
};

/**
 * UPDATE REVIEW
 * @param {object} req 
 * @param {object} res 
 * @param {function} next 
 */
exports.updateReview = (req, res, next) => {
  form.parse(req, (err, fields) => {

    if (err) {
      next(err);
      return;
    }

    ReviewModel
      .updateOne({ _id: req.params.id }, { ...fields, _id: req.params.id })
      .then(() => res.status(200).json({ message: process.env.REVIEW_UPDATED }))
      .catch((error) => res.status(400).json({ error }));
  })
};

/**
 * DELETE REVIEW
 * @param {object} req 
 * @param {object} res 
 */
exports.deleteReview = (req, res) => {
  ReviewModel
    .deleteOne({ _id: req.params.id })
    .then(() => res.status(200).json({ message: process.env.REVIEW_DELETED }))
    .catch((error) => res.status(400).json({ error }))
};
