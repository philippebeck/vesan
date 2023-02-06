"use strict";

const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const OrderModel = mongoose.Schema(
  {
    products: {
      type: Array,
      required: true
    },
    total: {
      type: Number,
      required: true
    },
    payment: {
      type: String,
      required: true
    },
    status: {
      type: String,
      default: "Pending"
    },
    user: { 
      type: String, 
      required: true
    },
    created: { 
      type: Date, 
      required: true
    },
    updated: { 
      type: Date, 
      required: true
    }
  },
  {
    versionKey: false
  }
);

OrderModel.plugin(uniqueValidator);

module.exports = mongoose.model("Order", OrderModel);
