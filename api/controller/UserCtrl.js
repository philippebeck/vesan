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

//! ****************************** CHECKERS ******************************

/**
 * ? CHECK USER DATA
 * * Validates user data & returns a JSON response with an error message if any validation fails.
 *
 * @param {string} name - The user's name.
 * @param {string} email - The user's email.
 * @param {string} role - The user's role.
 * @param {object} res - The response object.
 * @return {object} - JSON response with an error message if any validation fails.
 */
exports.checkUserData = (name, email, role, res) => {
  const MAX = process.env.STRING_MAX;
  const MIN = process.env.STRING_MIN;

  let alert = "";
  
  if (!nem.checkRange(role, MIN, MAX)) alert = process.env.CHECK_ROLE;
  if (!nem.checkEmail(email)) alert = process.env.CHECK_EMAIL;
  if (!nem.checkRange(name, MIN, MAX)) alert = process.env.CHECK_NAME;

  if (alert !== "") return res.status(403).json({ message: alert });
}

/**
 * ? CHECK USER PASSWORD
 * * Checks if the user password is valid.
 *
 * @param {string} pass - The user password to be checked.
 * @param {object} res - The response object.
 * @return {object} - The response object with an error message if the password is invalid.
 */
exports.checkUserPass = (pass, res) => {
  if (!nem.checkPass(pass)) { 
    return res.status(403).json({ message: process.env.CHECK_PASS }) 
  }
}

/**
 * ? CHECK USER UNIQUE
 * * Checks if the given user's name & email are unique.
 *
 * @param {string} name - The name to check against the user's name.
 * @param {string} email - The email to check against the user's email.
 * @param {object} user - The user object to compare against.
 * @param {object} res - The response object to send the result to.
 * @return {object} The JSON response containing the error message if the name or email is not unique.
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
 * ? CHECK USERS FOR UNIQUE
 * * Checks if users in the given array have unique fields except for the user with the given id,
 * * & calls the checkUserUnique function for each non-matching user.
 *
 * @param {string} id - The id of the user to exclude from the uniqueness check.
 * @param {Array} users - The array of user objects to check.
 * @param {Object} fields - The fields object containing the name & email fields to check for uniqueness.
 * @param {Object} res - The response object to send the result of the uniqueness check.
 */
exports.checkUsersForUnique = (id, users, fields, res) => {
  for (let user of users) { 
    if (!user._id.equals(id)) { 
      this.checkUserUnique(fields.name, fields.email, user, res) 
    } 
  }
}

//! ****************************** GETTERS ******************************

/**
 * ? GET USER CREATED
 * * Returns an object with the user's information.
 *
 * @param {string} name - The name of the user.
 * @param {string} email - The email of the user.
 * @param {string} image - The image of the user.
 * @param {string} pass - The password of the user.
 * @param {string} role - The role of the user.
 * @param {string} created - The creation date of the user.
 * @param {string} updated - The update date of the user.
 * @return {Object} - An object containing the user's information.
 */
exports.getUserCreated = (name, email, image, pass, role, created, updated) => {

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
 * ? GET USER WITH PASSWORD
 * * Returns a user object with the password field.
 *
 * @param {string} name - The name of the user.
 * @param {string} email - The email address of the user.
 * @param {string} image - The image URL of the user.
 * @param {string} pass - The password of the user.
 * @param {string} role - The role of the user.
 * @param {string} updated - The date of the last update.
 * @return {object} - The user object with the provided properties.
 */
exports.getUserWithPass = (name, email, image, pass, role, updated) => {

  return {
    name: name,
    email: email,
    image: image,
    pass: pass,
    role: role,
    updated: updated
  }
}

/**
 * ? GET USER NO PASSWORD
 * * Returns a user object without the password field.
 *
 * @param {string} name - The name of the user.
 * @param {string} email - The email address of the user.
 * @param {string} image - The URL of the user's profile image.
 * @param {string} role - The role of the user.
 * @param {string} updated - The date when the user was last updated.
 * @return {Object} - The user object without the password field.
 */
exports.getUserNoPass = (name, email, image, role, updated) => {

  return {
    name: name,
    email: email,
    image: image,
    role: role,
    updated: updated
  }
}

//! ****************************** SETTERS ******************************

/**
 * ? SET MESSAGE
 * * Sets the message using the provided fields & sends it via email.
 *
 * @param {object} fields - The fields containing the necessary information to construct the message.
 * @param {object} res - The response object used to send the HTTP response.
 * @return {undefined} This function does not return anything.
 */
exports.setMessage = (fields, res) => {
  const mailer = nem.getMailer();

  (async function(){
    try {
      let mail = nem.getMessage(fields);

      await mailer.sendMail(mail, function() {
        res.status(202).json({ message: process.env.USER_MESSAGE });
      });
    } catch(e){ console.error(e); }
  })();
}

//! ****************************** PUBLIC ******************************

/**
 * ? CREATE USER
 * * Creates a new user.
 *
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @param {Function} next - The next middleware function.
 * @return {undefined}
 */
exports.createUser = (req, res, next) => {
  form.parse(req, (err, fields, files) => {
    if (err) { next(err); return }

    this.checkUserData(fields.name, fields.email, fields.role, res);
    this.checkUserPass(fields.pass, res);

    UserModel
      .find()
      .then((users) => {
        for (let user of users) { this.checkUserUnique(fields.name, fields.email, user, res) }

        let image = nem.getName(fields.name) + "." + process.env.IMG_EXT;
        nem.setThumbnail("users/" + files.image.newFilename, USERS_THUMB + image);

        bcrypt
          .hash(fields.pass, 10)
          .then((hash) => {
            let user = new UserModel(this.getUserCreated(fields.name, fields.email, image, hash, fields.role, fields.created, fields.updated));

            user
              .save()
              .then(() => {
                fs.unlink(USERS_IMG + files.image.newFilename, () => { res.status(201).json({ message: process.env.USER_CREATED }) })
              })
              .catch(() => res.status(400).json({ message: process.env.USER_NOT_CREATED }));

          })
          .catch(() => res.status(400).json({ message: process.env.USER_NOT_PASS }));
      })
      .catch(() => { res.status(404).json({ message: process.env.USERS_NOT_FOUND }) });
  });
}

/**
 * ? SEND USER MESSAGE
 * * Sends a message.
 *
 * @param {Object} req - the request object
 * @param {Object} res - the response object
 * @param {Function} next - the next middleware function
 * @return {undefined} 
 */
exports.sendMessage = (req, res, next) => {
  form.parse(req, (err, fields) => {
    if (err) { next(err); return }

    fields.html = `<p>${fields.html}</p>`;
    this.setMessage(fields, res);
  })
}

//! ****************************** PRIVATE ******************************

/**
 * ? LIST ALL USERS WITHOUT PASSWORD
 * * Retrieves the list of users.
 *
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @return {Object} The list of users in JSON format.
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
    .catch(() => res.status(404).json({ message: process.env.USERS_NOT_FOUND }));
}

/**
 * ? READ A USER
 * * Retrieves a user by their ID & sends a JSON response.
 *
 * @param {object} req - The request object.
 * @param {object} res - The response object.
 * @return {object} The user data in JSON format.
 */
exports.readUser = (req, res) => {
  UserModel
  .findById(req.params.id)
  .then((user) => res.status(200).json(user))
  .catch(() => res.status(404).json({ message: process.env.USER_NOT_FOUND }));
}

/**
 * ? UPDATE USER
 * * Updates a user based on the provided request data.
 *
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @param {Function} next - The next middleware function.
 * @return {undefined} This function does not return anything.
 */
exports.updateUser = (req, res, next) => {
  form.parse(req, (err, fields, files) => {
    if (err) { next(err); return }

    this.checkUserData(fields.name, fields.email, fields.role, res);

    UserModel
      .find()
      .then((users) => {
        this.checkUsersForUnique(req.params.id, users, fields, res);

        let image = nem.getName(fields.name) + "." + process.env.IMG_EXT;
        if (files.image) nem.setThumbnail("users/" + files.image.newFilename, USERS_THUMB + image);

        if (fields.pass) {
          this.checkUserPass(fields.pass, res);

          bcrypt
          .hash(fields.pass, 10)
          .then((hash) => { 
            let user = this.getUserWithPass(fields.name, fields.email, image, hash, fields.role, fields.updated);

            UserModel
              .findByIdAndUpdate(req.params.id, { ...user, _id: req.params.id })
              .then(() => {
                if (files.image) fs.unlink(USERS_IMG + files.image.newFilename, () => {});
                res.status(200).json({ message: process.env.USER_UPDATED });
              })
              .catch(() => res.status(400).json({ message: process.env.USER_NOT_UPDATED }));
          })
          .catch(() => res.status(400).json({ message: process.env.USER_NOT_PASS }));
      
        } else { 
          let user = this.getUserNoPass(fields.name, fields.email, image, fields.role, fields.updated);

          UserModel
            .findByIdAndUpdate(req.params.id, { ...user, _id: req.params.id })
            .then(() => {
              if (files.image) fs.unlink(USERS_IMG + files.image.newFilename, () => {});
              res.status(200).json({ message: process.env.USER_UPDATED });
            })
            .catch(() => res.status(400).json({ message: process.env.USER_NOT_UPDATED }));
        }
      })
      .catch(() => res.status(404).json({ message: process.env.USERS_NOT_FOUND }));
  })
}

/**
 * ? DELETE USER
 * * Deletes a user and associated comments & reviews from the database.
 *
 * @param {Object} req - The request object containing the user id in the params.
 * @param {Object} res - The response object to send the result.
 * @return {Object} The response object with a status and JSON message indicating success or failure.
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
                  .catch(() => res.status(400).json({ message: process.env.USER_NOT_DELETED }))
              )
              .catch(() => res.status(400).json({ message: process.env.REVIEWS_NOT_DELETED }))
          )
          .catch(() => res.status(400).json({ message: process.env.COMMENTS_NOT_DELETED }))
      })
    })
    .catch(() => res.status(404).json({ message: process.env.USER_NOT_FOUND }));
}
