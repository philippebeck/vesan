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
    text: { 
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
    user: { 
      type: String, 
      required: true
    },
    usersLiked: {
      type: Array,
      default: []
    },
    cat: { 
      type: String, 
      default: "news"
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

ArticleModel.plugin(uniqueValidator);

module.exports = mongoose.model("Article", ArticleModel);
