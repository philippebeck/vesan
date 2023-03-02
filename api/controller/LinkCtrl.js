"use strict";

const formidable  = require("formidable");
const nem         = require("nemjs");
const LinkModel   = require("../model/LinkModel");

require("dotenv").config();
const form = formidable();

/**
 * CHECK LINK DATA
 * @param {string} name 
 * @param {string} url 
 * @param {string} cat 
 * @param {object} res 
 */
exports.checkLinkData = (name, url, cat, res) => {
  if (!nem.checkName(name)) {
    return res.status(400).json({ message: process.env.CHECK_NAME });
  }

  if (!nem.checkUrl("https://" + url)) {
    return res.status(400).json({ message: process.env.CHECK_URL });
  }

  if (cat === "") {
    return res.status(400).json({ message: process.env.CHECK_CAT });
  }
}

//! ****************************** PUBLIC ******************************

/**
 * LIST LINK
 * @param {object} req 
 * @param {object} res 
 */
exports.listLinks = (req, res) => {
  LinkModel
    .find()
    .then((links) => res.status(200).json(links))
    .catch((error) => res.status(404).json({ error }));
};

//! ****************************** PRIVATE ******************************

/**
 * CREATE LINK
 * @param {object} req 
 * @param {object} res 
 * @param {function} next 
 * @returns
 */
exports.createLink = (req, res, next) => {
  form.parse(req, (err, fields) => {

    if (err) {
      next(err);
      return;
    }

    this.checkLinkData(fields.name, fields.url, fields.cat, res);
    let link = new LinkModel(fields);

    link
      .save()
      .then(() => res.status(201).json({ message: process.env.LINK_CREATED }))
      .catch((error) => res.status(400).json({ error }));
  })
};

/**
 * UPDATE LINK
 * @param {object} req 
 * @param {object} res 
 * @param {function} next 
 * @returns
 */
exports.updateLink = (req, res, next) => {
  form.parse(req, (err, fields) => {

    if (err) {
      next(err);
      return;
    }

    this.checkLinkData(fields.name, fields.url, fields.cat, res);

    LinkModel
      .findByIdAndUpdate(req.params.id, { ...fields, _id: req.params.id })
      .then(() => res.status(200).json({ message: process.env.LINK_UPDATED }))
      .catch((error) => res.status(400).json({ error }));
  })
};

/**
 * DELETE LINK
 * @param {object} req 
 * @param {object} res 
 */
exports.deleteLink = (req, res) => {
  LinkModel
    .findByIdAndDelete(req.params.id)
    .then(() => res.status(204).json({ message: process.env.LINK_DELETED }))
    .catch((error) => res.status(400).json({ error }))
};
