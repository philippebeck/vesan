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
    product: { 
      type: String, 
      required: true
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

ReviewModel.plugin(uniqueValidator);

module.exports = mongoose.model("Review", ReviewModel);
