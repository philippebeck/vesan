"use strict";

const bcrypt      = require("bcrypt");
const formidable  = require("formidable");
const fs          = require("fs");
const nem         = require("nemjs");

const UserModel     = require("../model/UserModel");
const CommentModel  = require("../model/CommentModel");
const ReviewModel   = require("../model/ReviewModel");

require("dotenv").config();

const USERS_IMG = process.env.IMG_URL + "users/";
const USERS_THUMB = process.env.THUMB_URL + "users/";
const form = formidable({ uploadDir: USERS_IMG, keepExtensions: true });

/**
 * CHECK USER DATA
 * @param {string} name 
 * @param {string} email 
 * @param {string} pass 
 * @param {string} role 
 * @param {object} res 
 */
exports.checkUserData = (name, email, pass, role, res) => {
  if (!nem.checkName(name)) {
    return res.status(403).json({ message: process.env.CHECK_NAME });
  }

  if (!nem.checkEmail(email)) {
    return res.status(403).json({ message: process.env.USER_EMAIL });
  }

  if (!nem.checkPass(pass)) {
    return res.status(403).json({ message: process.env.USER_PASS });
  }

  if (role === "") {
    return res.status(403).json({ message: process.env.CHECK_ROLE });
  }
}

/**
 * CHECK USER UNIQUE
 * @param {string} name 
 * @param {string} email 
 * @param {object} user 
 * @param {object} res 
 * @returns 
 */
exports.checkUserUnique = (name, email, user, res) => {
  if (user.name === name) {
    return res.status(403).json({ message: process.env.DISPO_NAME });
  }

  if (user.email === email) {
    return res.status(403).json({ message: process.env.DISPO_EMAIL });
  }
}

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

/**
 * UPDATE IMAGE
 * @param {string} id 
 * @param {string} name 
 * @param {string} newFilename 
 * @returns 
 */
exports.updateImage = (id, name, newFilename) => {
  let image = nem.getImgName(name);
  nem.createThumbnail("users/" + newFilename, "users/" + image);

  UserModel
    .findById(id)
    .then((user) => 
      fs.unlink(USERS_THUMB + user.image, () => {
        fs.unlink(USERS_IMG + newFilename, () => {
          console.log("Images ok !");
        })
      })
    )
  return image;
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

    this.checkUserData(fields.name, fields.email, fields.role, res);

    if (!nem.checkPass(fields.pass)) {
      return res.status(403).json({ message: process.env.CHECK_PASS });
    }

    UserModel
      .find()
      .then((users) => {
        for (let user of users) {
          this.checkUserUnique(fields.name, fields.email, user, res);
        }

        let image = nem.getImgName(fields.name);
        nem.createThumbnail("users/" + files.image.newFilename, "users/" + image);

        bcrypt
          .hash(fields.pass, 10)
          .then((hash) => {
            let user = new UserModel(this.getUser(
              fields.name, fields.email, image, hash, fields.role, fields.created, fields.updated
            ));

            fs.unlink(USERS_IMG + files.image.newFilename, () => {
              user
                .save()
                .then(() => res.status(201).json({ message: process.env.USER_CREATED }))
                .catch((error) => res.status(400).json({ error }));
            });
          })
          .catch((error) => res.status(400).json({ error }));
      })
      .catch((error) => { res.status(404).json({ error }) });
  });
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
      .then((user) => { res.status(200).json(user.name) })
      .catch((error) => res.status(404).json({ error }));
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
      })
      .catch((error) => res.status(404).json({ error }));
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

    fields.html = `<p>${fields.html}</p>`;

    this.setMessage(fields, res);
  })
}

//! ****************************** PRIVATE ******************************

/**
 * LIST ALL USERS WITHOUT PASSWORD
 * @param {object} req 
 * @param {object} res 
 */
exports.listUsers = (req, res) => {
  UserModel
    .find()
    .then((users) => {
      let usersList = [];

      for (let user of users) {
        let userSafe = {
          _id: user._id,
          name: user.name,
          email: user.email,
          image: user.image,
          role: user.role,
          created: user.created,
          updated: user.updated,
        };

        usersList.push(userSafe);
      }
      res.status(200).json(usersList);
    })
    .catch((error) => res.status(404).json({ error }));
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
  .catch((error) => res.status(404).json({ error }));
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

    let image = fields.image;

    if (Object.keys(files).length !== 0) {
      image = this.updateImage(req.params.id, fields.name, files.image.newFilename);
    }

    if (fields.pass) {
      this.checkUserData(fields.name, fields.email, fields.pass, fields.role, res);

      bcrypt
      .hash(fields.pass, 10)
      .then((hash) => {

        let user = this.getUser(
          fields.name, fields.email, image, hash, fields.role, fields.created, fields.updated
        )

        UserModel
          .findByIdAndUpdate(req.params.id, { ...user, _id: req.params.id })
          .then(() => res.status(200).json({ message: process.env.USER_UPDATED }))
          .catch((error) => res.status(400).json({ error }));
      })
      .catch((error) => res.status(400).json({ error }));

    } else {

      if (!nem.checkName(fields.name)) {
        return res.status(400).json({ message: process.env.CHECK_NAME });
      }
    
      if (!nem.checkEmail(fields.email)) {
        return res.status(400).json({ message: process.env.USER_EMAIL });
      }
    
      if (fields.role === "") {
        return res.status(400).json({ message: process.env.CHECK_ROLE });
      }

      let user = {
        name: fields.name,
        email: fields.email,
        image: image,
        role: fields.role,
        created: fields.created,
        updated: fields.updated,
      }

      UserModel
        .findByIdAndUpdate(req.params.id, { ...user, _id: req.params.id })
        .then(() => res.status(200).json({ message: process.env.USER_UPDATED }))
        .catch((error) => res.status(400).json({ error }));
    }
  });
}

/**
 * DELETE USER
 * @param {object} req 
 * @param {object} res 
 */
exports.deleteUser = (req, res) => {
  UserModel
    .findById(req.params.id)
    .then(user => {
      fs.unlink(USERS_THUMB + user.image, () => {

        CommentModel
          .deleteMany({ user: req.params.id })
          .then(() =>
            ReviewModel
              .deleteMany({ user: req.params.id })
              .then(() => 

                UserModel
                  .findByIdAndDelete(req.params.id)
                  .then(() => res.status(204).json({ message: process.env.USER_DELETED }))
                  .catch((error) => res.status(400).json({ error }))
              )
              .catch((error) => res.status(400).json({ error }))
          )
          .catch((error) => res.status(400).json({ error }))
      })
    })
    .catch(error => res.status(404).json({ error }));
}
