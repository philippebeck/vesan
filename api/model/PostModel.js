"use strict";

const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const PostModel = mongoose.Schema(
  {
    title: { 
      type: String, 
      required: true,
      unique: true
    },
    cat: { 
      type: String, 
      required: true
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
    author: { 
      type: String, 
      required: true
    }
  },
  {
    versionKey: false
  }
);

PostModel.plugin(uniqueValidator);

module.exports = mongoose.model("Post", PostModel);
