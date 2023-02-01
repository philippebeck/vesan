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
    cat: { 
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
    },
    likes: {
      type: Number,
      required: true
    },
    usersLiked: {
      type: Array,
      required: true
    }
  },
  {
    versionKey: false
  }
);

PostModel.plugin(uniqueValidator);

module.exports = mongoose.model("Post", PostModel);
