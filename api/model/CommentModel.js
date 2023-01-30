"use strict";

const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const CommentModel = mongoose.Schema(
  {
    text: { 
      type: String, 
      required: true
    },
    post: { 
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

CommentModel.plugin(uniqueValidator);

module.exports = mongoose.model("Comment", CommentModel);
