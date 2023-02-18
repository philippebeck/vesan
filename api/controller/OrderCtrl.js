"use strict";

const formidable  = require("formidable");
const nem         = require("nemjs");

const OrderModel  = require("../model/OrderModel");
const UserModel   = require("../model/UserModel");

require("dotenv").config();
const form = formidable();

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

//! ****************************** PRIVATE ******************************

/**
 * LIST ORDERS
 * @param {object} req 
 * @param {object} res 
 */
exports.listOrders = (req, res) => {
  OrderModel
    .find()
    .then((orders) => res.status(200).json(orders))
    .catch((error) => res.status(400).json({ error }));
};

/**
 * LIST USER ORDERS
 * @param {object} req 
 * @param {object} res 
 */
exports.listUserOrders = (req, res) => {
  OrderModel
    .find({ user: req.params.id })
    .then((orders) => res.status(200).json(orders))
    .catch((error) => res.status(400).json({ error }));
};

/**
 * CREATE ORDER
 * @param {object} req 
 * @param {object} res 
 * @param {function} next 
 */
exports.createOrder = (req, res, next) => {
  form.parse(req, (err, fields) => {

    if (err) {
      next(err);
      return;
    }

    let message = {};
    message.subject = process.env.ORDER_SUBJECT;
    message.text    = fields.products;

    fields.products = JSON.parse(fields.products);
    let order       = new OrderModel(fields);

    order
      .save()
      .then(() => {
        UserModel
          .findOne({ _id: fields.user })
          .then((user) => {
            message.email = user.email;
            this.setMessage(message, res);
          })
          .catch(err => { console.log(err) });
      })
      .then(() => res.status(201).json({ message: process.env.ORDER_CREATED }))
      .catch((error) => res.status(400).json({ error }));
  })
};

/**
 * UPDATE ORDER
 * @param {object} req 
 * @param {object} res 
 * @param {function} next 
 */
exports.updateOrder = (req, res, next) => {
  form.parse(req, (err, fields) => {

    if (err) {
      next(err);
      return;
    }

    fields.products = JSON.parse(fields.products);

    OrderModel
      .findByIdAndUpdate(req.params.id, { ...fields, _id: req.params.id })
      .then(() => res.status(200).json({ message: process.env.ORDER_UPDATED }))
      .catch((error) => res.status(400).json({ error }));
  })
};

/**
 * DELETE ORDER
 * @param {object} req 
 * @param {object} res 
 */
exports.deleteOrder = (req, res) => {
  OrderModel
    .findByIdAndDelete(req.params.id)
    .then(() => res.status(200).json({ message: process.env.ORDER_DELETED }))
    .catch((error) => res.status(400).json({ error }))
};
