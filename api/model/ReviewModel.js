"use strict";

const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const ReviewModel = mongoose.Schema(
  {
    text: { 
      type: String, 
      required: true
    },
    score: { 
      type: Number, 
      required: true
    },
    article: { 
      type: String, 
      required: true
    },
    user: { 
      type: String, 
      required: true
    },
    date: { 
      type: Date, 
      required: true
    }
  },
  {
    versionKey: false
  }
);

ReviewModel.plugin(uniqueValidator);

module.exports = mongoose.model("Review", ReviewModel);
