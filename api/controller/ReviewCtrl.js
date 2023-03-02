"use strict";

const formidable  = require("formidable");
const ReviewModel = require("../model/ReviewModel");
const UserModel   = require("../model/UserModel");

require("dotenv").config();
const form = formidable();

/**
 * CHECK REVIEW DATA
 * @param {string} text 
 * @param {string} score 
 * @param {object} res 
 */
exports.checkReviewData = (text, score, res) => {
  if (!nem.checkText(text)) {
    return res.status(400).json({ message: process.env.CHECK_TEXT });
  }

  if (score < 0 || score > 5) {
    return res.status(400).json({ message: process.env.CHECK_SCORE });
  }
}

//! ****************************** PUBLIC ******************************

/**
 * LIST PRODUCT REVIEWS
 * @param {object} req 
 * @param {object} res 
 */
exports.listProductReviews = (req, res) => {
  ReviewModel
    .find({ product: req.params.id })
    .then((reviews) => {

      UserModel
        .find()
        .then((users) => {

          for (let review of reviews) {
            for (let user of users) {
              if (review.user === user._id.toString()) {
                review.user = user.name + "-" + review.user;
              }
            }
          }
          res.status(200).json(reviews);
        })
        .catch((error) => res.status(404).json({ error }));
    })
    .catch((error) => res.status(404).json({ error }));
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
    .catch((error) => res.status(404).json({ error }));
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

    this.checkReviewData(fields.text, fields.score, res);
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

    this.checkReviewData(fields.text, fields.score, res);

    ReviewModel
      .findByIdAndUpdate(req.params.id, { ...fields, _id: req.params.id })
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
    .findByIdAndDelete(req.params.id)
    .then(() => res.status(204).json({ message: process.env.REVIEW_DELETED }))
    .catch((error) => res.status(400).json({ error }))
};
