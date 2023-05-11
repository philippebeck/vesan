"use strict";

const bcrypt      = require("bcrypt");
const formidable  = require("formidable");
const nem         = require("nemjs");
const Recaptcha   = require("google-recaptcha");

const UserModel = require("../model/UserModel");

require("dotenv").config();

const form = formidable();
const recaptcha = new Recaptcha({ secret: process.env.RECAPTCHA_SECRET });

//! ****************************** CHECKER ******************************

/**
 * CHECK AUTH DATA
 * @param {string} email 
 * @param {object} res 
 */
exports.checkAuthData = (email, res) => {
  if (!nem.checkEmail(email)) {
    return res.status(403).json({ message: process.env.CHECK_EMAIL });
  }
}

//! ****************************** GETTER ******************************

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

//! ****************************** SETTER ******************************

/**
 * SET MAILER
 * @param {string} fields 
 * @param {object} res 
 */
exports.setMailer = (fields, res) => {
  const mailer = nem.getMailer();

  (async function(){
    try {
      let mail = nem.getMessage(fields);

      await mailer.sendMail(mail, function() {
        res.status(202).json({ message: process.env.AUTH_MESSAGE });
      });
    } catch(e){ console.error(e); }
  })();
}

/**
 * SET MESSAGE
 * @param {array} fields 
 * @param {string} pass 
 * @returns 
 */
exports.setMessage = (fields, pass) => {
  fields.html = `
    <p>${fields.html}</p>
    <b>${pass}</b>
  `;

  return fields;
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
    .catch(() => res.status(404).json({ message: process.env.USER_NOT_FOUND }));
}

/**
 * CHECK RECAPTCHA
 * @param {object} req 
 * @param {object} res 
 * @param {function} next 
 */
exports.checkRecaptcha = (req, res, next) => {
  form.parse(req, (err, fields) => {
    if (err) { next(err); return }

    const response = fields.response;
    const remoteIp = req.connection.remoteAddress;

    recaptcha.verify({ response, remoteIp }, (err, data) => {

      if (err) {
        res.status(500).send(err);
      } else {
        res.send(data);
      }
    });
  })
}

/**
 * LOGIN USER
 * @param {object} req 
 * @param {object} res 
 * @param {function} next 
 */
exports.loginUser = (req, res, next) => {
  form.parse(req, (err, fields) => {
    if (err) { next(err); return }

    UserModel
      .findOne({ email: fields.email })
      .then((user) => { nem.setAuth(fields.pass, user, res) })
      .catch(() => res.status(401).json({ message: process.env.AUTH_LOGIN }));
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
    if (err) { next(err); return }

    this.checkAuthData(fields.email, res);

    UserModel
      .findOne({ email: fields.email })
      .then((user) => {
        if (user !== null) {

          let pass    = nem.getPassword();
          fields.html = this.setMessage(fields, pass);

          bcrypt
            .hash(pass, 10)
            .then((hash) => {
              let newUser = this.getUser(user.name, user.email, user.image, hash, user.role, user.created, user.updated);

              UserModel
                .findByIdAndUpdate(user._id, { ...newUser, _id: user._id })
                .then(() => { this.setMailer(fields, res) })
                .catch(() => res.status(400).json({ message: process.env.USER_NOT_UPDATED }));
            })
            .catch(() => res.status(400).json({ message: process.env.USER_NOT_PASS }));

        } else {
          return res.status(403).json({ message: process.env.DISPO_EMAIL_REF });
        }
      })
      .catch(() => res.status(404).json({ message: process.env.USER_NOT_FOUND }));
  })
}
