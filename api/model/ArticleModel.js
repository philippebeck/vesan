"use strict";

const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const ArticleModel = mongoose.Schema(
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
    cat: { 
      type: String, 
      required: true
    },
    createdDate: {
      type: Date,
      required: true
    },
    updatedDate: {
      type: Date,
      required: true
    }
  },
  {
    versionKey: false
  }
);

ArticleModel.plugin(uniqueValidator);

module.exports = mongoose.model("Article", ArticleModel);
