"use strict";

const bcrypt      = require("bcrypt");
const formidable  = require("formidable");
const fs          = require("fs");
const nem         = require("nemjs");
const accents     = require("remove-accents");

const UserModel     = require("../model/UserModel");
const CommentModel  = require("../model/CommentModel");
const ReviewModel   = require("../model/ReviewModel");

require("dotenv").config();

const USERS_IMG   = process.env.IMG_URL + "users/";
const USERS_THUMB = process.env.THUMB_URL + "users/";

const form = formidable({ 
  uploadDir: USERS_IMG, 
  keepExtensions: true 
});

/**
 * CHECK USER CREDENTIALS
 * @param {string} email 
 * @param {string} pass 
 * @param {object} res 
 */
exports.checkCredentials = (email, pass, res) => {
  if (!nem.checkEmail(email)) {
    return res.status(401).json({ message: process.env.USER_EMAIL });
  }

  if (!nem.checkPass(pass)) {
    return res.status(401).json({ message: process.env.USER_PASS });
  }
}

/**
 * GET USER
 * @param {string} name 
 * @param {string} email 
 * @param {string} image 
 * @param {string} alt 
 * @param {string} pass 
 * @param {string} role 
 * @param {string} created 
 * @param {string} updated 
 * @returns 
 */
exports.getUser = (name, email, image, alt, pass, role, created, updated) => {

  return {
    name: name,
    email: email,
    image: image,
    alt: alt,
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
        res.status(200).json({ message: process.env.USER_MESSAGE });
      });
    } catch(e){ console.error(e); }
  })();
}

//! ****************************** PUBLIC ******************************

/**
 * CHECK USERS
 * @param {object} req 
 * @param {object} res 
 */
exports.checkUsers = (req, res) => {
  UserModel
    .find()
    .then((users) => {
        let usersChecked = [];
        for (let i = 0; i < users.length; i++) {

          usersChecked.push({
            _id: users[i]._id,
            name: users[i].name,
            email: users[i].email,
            role: users[i].role
          });
        }
        res.status(200).json(usersChecked);
      }
    )
    .catch((error) => res.status(400).json({ error }));
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
      .catch((error) => res.status(500).json({ error }));
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

    UserModel
      .findOne({ email: fields.email })
      .then((user) => { 
        let pass    = nem.generatePass();
        fields.text = fields.text + pass;

        bcrypt
          .hash(pass, 10)
          .then((hash) => {
            let newUser = this.getUser(
              user.name, 
              user.email, 
              user.image, 
              user.alt, 
              hash,
              user.role,
              user.created,
              user.updated
            );

            UserModel
              .updateOne({ _id: user._id }, { ...newUser, _id: user._id })
              .then(() => { this.setMessage(fields, res) })
              .catch((error) => res.status(500).json({ error }));
          })
          .catch((error) => res.status(400).json({ error }));
      })
      .catch((error) => res.status(500).json({ error }));
  })
}

/**
 * SEND USER MESSAGE
 * @param {object} req 
 * @param {object} res 
 * @param {function} next 
 */
exports.sendMessage = (req, res, next) => {
  form.parse(req, (err, fields) => {

    if (err) {
      next(err);
      return;
    }

    this.setMessage(fields, res);
  })
}

//! ****************************** PRIVATE ******************************

/**
 * LIST ALL USERS
 * @param {object} req 
 * @param {object} res 
 */
exports.listUsers = (req, res) => {
  UserModel
    .find()
    .then((users) => res.status(200).json(users))
    .catch((error) => res.status(400).json({ error }));
}

/**
 * CREATE USER
 * @param {object} req 
 * @param {object} res 
 * @param {function} next 
 */
exports.createUser = (req, res, next) => {
  form.parse(req, (err, fields, files) => {

    if (err) {
      next(err);
      return;
    }

    this.checkCredentials(fields.email, fields.pass, res);
    let image = nem.getImgName(fields.name);

    nem.createThumbnail(
      "users/" + files.image.newFilename, 
      "users/" + image
    );

    bcrypt
      .hash(fields.pass, 10)
      .then((hash) => {
        let user = new UserModel(
          this.getUser(
            fields.name, 
            fields.email, 
            image, 
            fields.alt, 
            hash,
            fields.role, 
            fields.created, 
            fields.updated
          ));

        fs.unlink(USERS_IMG + files.image.newFilename, () => {
          user
            .save()
            .then(() => res.status(201).json({ message: process.env.USER_CREATED }))
            .catch((error) => res.status(400).json({ error }));
        });
      })
      .catch((error) => res.status(500).json({ error }));
  });
}

/**
 * READ A USER
 * @param {object} req 
 * @param {object} res 
 */
exports.readUser = (req, res) => {
  UserModel
  .findById(req.params.id)
  .then((user) => res.status(200).json(user))
  .catch((error) => res.status(400).json({ error }));
}

/**
 * UPDATE USER
 * @param {object} req 
 * @param {object} res 
 * @param {function} next 
 */
exports.updateUser = (req, res, next) => {
  form.parse(req, (err, fields, files) => {

    if (err) {
      next(err);
      return;
    }

    this.checkCredentials(fields.email, fields.pass, res);
    let image = fields.image;

    if (Object.keys(files).length !== 0) {
      image = nem.getImgName(fields.name);

      nem.createThumbnail(
        "users/" + files.image.newFilename, 
        "users/" + image
      );
  
      UserModel
        .findOne({ _id: req.params.id })
        .then((user) => 
          fs.unlink(USERS_THUMB + user.image, () => {
            fs.unlink(USERS_IMG + files.image.newFilename, () => {
              console.log("Image ok !");
            })
          })
        )
    }

    bcrypt
      .hash(fields.pass, 10)
      .then((hash) => {
        let user = this.getUser(
          fields.name, 
          fields.email, 
          image, 
          fields.alt, 
          hash,
          fields.role, 
          fields.created, 
          fields.updated
        );

        UserModel
          .updateOne({ _id: req.params.id }, { ...user, _id: req.params.id })
          .then(() => res.status(200).json({ message: process.env.USER_UPDATED }))
      })
      .catch((error) => res.status(400).json({ error }));
  });
}

/**
 * DELETE USER
 * @param {object} req 
 * @param {object} res 
 */
exports.deleteUser = (req, res) => {
  UserModel
    .findOne({ _id: req.params.id })
    .then(user => {
      fs.unlink(USERS_THUMB + user.image, () => {

        CommentModel
          .deleteMany({ user: req.params.id })
          .then(() =>
            ReviewModel
              .deleteMany({ user: req.params.id })
              .then(() => 

                UserModel
                  .deleteOne({ _id: req.params.id })
                  .then(() => res.status(200).json({ message: process.env.USER_DELETED }))
                  .catch((error) => res.status(400).json({ error }))
              )
              .catch((error) => res.status(400).json({ error }))
          )
          .catch((error) => res.status(400).json({ error }))
      })
    })
    .catch(error => res.status(500).json({ error }));
}
