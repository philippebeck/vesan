"use strict";

const bcrypt      = require("bcrypt");
const formidable  = require("formidable");
const nem         = require("nemjs");

const UserModel = require("../model/UserModel");

require("dotenv").config();
const form = formidable();

/**
 * GET USER
 * @param {string} name 
 * @param {string} email 
 * @param {string} image 
 * @param {string} pass 
 * @param {string} role 
 * @param {string} created 
 * @param {string} updated 
 * @returns 
 */
exports.getUser = (name, email, image, pass, role, created, updated) => {

  return {
    name: name,
    email: email,
    image: image,
    pass: pass,
    role: role,
    created: created,
    updated: updated
  }
}

/**
 * SET MESSAGE
 * @param {string} fields 
 * @param {object} res 
 */
exports.setMessage = (fields, res) => {
  const mailer = nem.createMailer();

  (async function(){
    try {
      let mail = nem.createMessage(fields);

      await mailer.sendMail(mail, function() {
        res.status(202).json({ message: process.env.USER_MESSAGE });
      });
    } catch(e){ console.error(e); }
  })();
}

//! ****************************** PUBLIC ******************************

/**
 * READ AVATAR
 * @param {object} req 
 * @param {object} res 
 */
exports.readAvatar = (req, res) => {
  UserModel
    .findById(req.params.id)
    .then((user) => { 
      let avatar = {};

      avatar.name   = user.name;
      avatar.image  = user.image;
      avatar.role   = user.role;

      res.status(200).json(avatar) 
    })
    .catch((error) => res.status(404).json({ error }));
}

/**
 * LOGIN USER
 * @param {object} req 
 * @param {object} res 
 * @param {function} next 
 */
exports.loginUser = (req, res, next) => {
  form.parse(req, (err, fields) => {

    if (err) {
      next(err);
      return;
    }

    UserModel
      .findOne({ email: fields.email })
      .then((user) => { nem.checkLogin(fields.pass, user, res) })
      .catch((error) => res.status(401).json({ error }));
  })
}

/**
 * FORGOT PASSWORD
 * @param {object} req 
 * @param {object} res 
 * @param {function} next 
 */
exports.forgotPass = (req, res, next) => {
  form.parse(req, (err, fields) => {

    if (err) {
      next(err);
      return;
    }

    if (!nem.checkEmail(fields.email)) {
      return res.status(403).json({ message: process.env.CHECK_EMAIL });
    }

    UserModel
      .findOne({ email: fields.email })
      .then((user) => {
        if (user !== null) {
          let pass = nem.generatePass();

          fields.html = `
            <p>${fields.html}</p>
            <b>${pass}</b>
          `;

          bcrypt
            .hash(pass, 10)
            .then((hash) => {
              let newUser = this.getUser(
                user.name, user.email, user.image, hash, 
                user.role, user.created, user.updated
              );

              UserModel
                .findByIdAndUpdate(user._id, { ...newUser, _id: user._id })
                .then(() => { this.setMessage(fields, res) })
                .catch((error) => res.status(400).json({ error }));
            })
            .catch((error) => res.status(400).json({ error }));

        } else {
          return res.status(403).json({ message: process.env.DISPO_EMAIL_REF });
        }
      })
      .catch((error) => res.status(404).json({ error }));
  })
}
