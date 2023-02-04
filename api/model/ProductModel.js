"use strict";

const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const ProductModel = mongoose.Schema(
  {
    name: { 
      type: String, 
      required: true,
      unique: true
    },
    description: { 
      type: String, 
      required: true,
      unique: true
    },
    image: { 
      type: String, 
      required: true,
      unique: true
    },
    alt: { 
      type: String, 
      required: true
    },
    price: { 
      type: Number, 
      required: true
    },
    options: {
      type: Array,
      default: []
    },
    cat: { 
      type: String, 
      default: "Electronics"
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

ProductModel.plugin(uniqueValidator);

module.exports = mongoose.model("Product", ProductModel);
