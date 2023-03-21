"use strict";

const formidable  = require("formidable");
const nem         = require("nemjs");

const OrderModel  = require("../model/OrderModel");
const UserModel   = require("../model/UserModel");

require("dotenv").config();
const form = formidable();

//! ****************************** SETTERS ******************************

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
        res.status(202).json({ message: process.env.ORDER_MESSAGE });
      });
    } catch(e){ console.error(e); }
  })();
}

/**
 * SET MESSAGE
 * @param {number} total 
 * @param {string} payment 
 * @param {array} products 
 * @returns 
 */
exports.setMessage = (total, payment, products) => {
  let message = {};
  message.subject = process.env.ORDER_SUBJECT;

  message.text = `
    <h1>${process.env.ORDER_TITLE}</h1>
    <p>
      ${process.env.ORDER_TOTAL} 
      <b>${total} ${process.env.CURRENCY_SYMBOL}</b>,
      ${process.env.ORDER_PAYMENT} 
      <b>#${payment}</b> !
    </p>
    <p>${process.env.ORDER_LIST}</p>`;

  for (let product of products) {
    message.products += `
      <ul>
        <li><i>id</i> : ${product.id}</li>
        <li><i>${process.env.ORDER_NAME}</i> : <b>${product.name}</b></li>
        <li><i>option</i> : <b>${product.option}</b></li>
        <li><i>${process.env.ORDER_QUANTITY}</i> : ${product.quantity}</li>
        <li><i>${process.env.ORDER_PRICE}</i> : ${product.price} ${process.env.CURRENCY_SYMBOL}</li>
      </ul>`;
  }

  message.products  = message.products.split('undefined')[1];
  message.html      = message.text + message.products;

  return message;
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
    .then((orders) => {

      UserModel
        .find()
        .then((users) => {

          orders = nem.getArrayWithUsername(orders, users);
          res.status(200).json(orders);
        })
      .catch(() => res.status(404).json({ message: process.env.USERS_NOT_FOUND }));
    })
    .catch(() => res.status(404).json({ message: process.env.ORDERS_NOT_FOUND }));
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
    .catch(() => res.status(404).json({ message: process.env.ORDERS_NOT_FOUND }));
};

/**
 * CREATE ORDER
 * @param {object} req 
 * @param {object} res 
 * @param {function} next 
 */
exports.createOrder = (req, res, next) => {
  form.parse(req, (err, fields) => {
    if (err) { next(err); return }

    fields.products = JSON.parse(fields.products);
    let message     = this.setMessage(fields.total, fields.payment, fields.products);
    let order       = new OrderModel(fields);

    order
      .save()
      .then(() => {

        UserModel
          .findOne({ _id: fields.user })
          .then((user) => {

            message.email = user.email;
            this.setMailer(message, res);
          })
          .catch(() => res.status(404).json({ message: process.env.USER_NOT_FOUND }));
      })
      .then(() => res.status(201).json({ message: process.env.ORDER_CREATED }))
      .catch(() => res.status(400).json({ message: process.env.ORDER_NOT_CREATED }));
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

    if (err) { next(err); return }
    if (fields.products) { fields.products = JSON.parse(fields.products) }

    OrderModel
      .findByIdAndUpdate(req.params.id, { ...fields, _id: req.params.id })
      .then(() => res.status(200).json({ message: process.env.ORDER_UPDATED }))
      .catch(() => res.status(400).json({ message: process.env.ORDER_NOT_UPDATED }));
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
    .then(() => res.status(204).json({ message: process.env.ORDER_DELETED }))
    .catch(() => res.status(400).json({ message: process.env.ORDER_NOT_DELETED }))
};
