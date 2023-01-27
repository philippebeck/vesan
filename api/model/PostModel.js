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
    text: { 
      type: String, 
      required: true
    },
    image: { 
      type: String, 
      required: true,
      unique: true
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

PostModel.plugin(uniqueValidator);

module.exports = mongoose.model("Post", PostModel);
