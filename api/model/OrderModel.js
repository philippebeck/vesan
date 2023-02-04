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
    user: { 
      type: String, 
      required: true
    },
    created: { 
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
