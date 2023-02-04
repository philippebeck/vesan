"use strict";

const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const CommentModel = mongoose.Schema(
  {
    text: { 
      type: String, 
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

CommentModel.plugin(uniqueValidator);

module.exports = mongoose.model("Comment", CommentModel);
