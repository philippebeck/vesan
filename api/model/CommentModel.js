"use strict";

const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const CommentModel = mongoose.Schema(
  {
    text: { 
      type: String, 
      required: true
    },
    postId: { 
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

CommentModel.plugin(uniqueValidator);

module.exports = mongoose.model("Comment", CommentModel);
