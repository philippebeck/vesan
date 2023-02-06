"use strict";

const formidable = require("formidable");

const OrderModel = require("../model/OrderModel");

require("dotenv").config();

const form = formidable();

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

    let order = new OrderModel(fields);

    order
      .save()
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

    OrderModel
      .updateOne({ _id: req.params.id }, { ...fields, _id: req.params.id })
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
    .deleteOne({ _id: req.params.id })
    .then(() => res.status(200).json({ message: process.env.ORDER_DELETED }))
    .catch((error) => res.status(400).json({ error }))
};
