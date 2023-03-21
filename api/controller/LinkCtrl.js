"use strict";

const formidable  = require("formidable");
const nem         = require("nemjs");
const LinkModel   = require("../model/LinkModel");

require("dotenv").config();
const form = formidable();

//! ****************************** CHECKERS ******************************

/**
 * CHECK LINK DATA
 * @param {string} name 
 * @param {string} url 
 * @param {string} cat 
 * @param {object} res 
 */
exports.checkLinkData = (name, url, cat, res) => {
  let alert = "";

  if (!nem.checkString(cat)) { alert = process.env.CHECK_CAT }
  if (!nem.checkUrl("https://" + url)) { alert = process.env.CHECK_URL }
  if (!nem.checkString(name)) { alert = process.env.CHECK_NAME }

  if (alert !== "") {
    return res.status(403).json({ message: alert });
  }
}

/**
 * CHECK LINK UNIQUE
 * @param {string} name 
 * @param {string} url 
 * @param {object} link 
 * @param {object} res 
 * @returns
 */
exports.checkLinkUnique = (name, url, link, res) => {
  if (link.name === name) {
    return res.status(403).json({ message: process.env.DISPO_NAME });
  }

  if (link.url === url) {
    return res.status(403).json({ message: process.env.DISPO_URL });
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
    .catch(() => res.status(404).json({ message: process.env.LINKS_NOT_FOUND }));
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
    if (err) { next(err); return }

    this.checkLinkData(fields.name, fields.url, fields.cat, res);

    LinkModel
      .find()
      .then((links) => {
        for (let link of links) {
          this.checkLinkUnique(fields.name, fields.url, link, res);
        }

        let link = new LinkModel(fields);

        link
          .save()
          .then(() => res.status(201).json({ message: process.env.LINK_CREATED }))
          .catch(() => res.status(400).json({ message: process.env.LINK_NOT_CREATED }));
      })
      .catch(() => res.status(404).json({ message: process.env.LINKS_NOT_FOUND }));
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
    if (err) { next(err); return }

    this.checkLinkData(fields.name, fields.url, fields.cat, res);

    LinkModel
      .find()
      .then((links) => {
        for (let link of links) {

          if (!link._id.equals(req.params.id)) {
            this.checkLinkUnique(fields.name, fields.url, link, res);
          }
        }

        LinkModel
          .findByIdAndUpdate(req.params.id, { ...fields, _id: req.params.id })
          .then(() => res.status(200).json({ message: process.env.LINK_UPDATED }))
          .catch(() => res.status(400).json({ message: process.env.LINK_NOT_UPDATED }));
      })
      .catch(() => res.status(404).json({ message: process.env.LINKS_NOT_FOUND }));
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
    .catch(() => res.status(400).json({ message: process.env.LINK_NOT_DELETED }))
};
