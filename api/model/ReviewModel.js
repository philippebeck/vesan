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
    articleId: { 
      type: String, 
      required: true
    },
    userId: { 
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

ReviewModel.plugin(uniqueValidator);

module.exports = mongoose.model("Review", ReviewModel);
