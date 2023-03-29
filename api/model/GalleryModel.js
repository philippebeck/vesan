"use strict";

const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const GalleryModel = mongoose.Schema(
  {
    name: { 
      type: String, 
      required: true,
      unique: true
    },
    author: { 
      type: String, 
      required: true
    },
    cover: { 
      type: String,
      default: ""
    }
  },
  {
    versionKey: false
  }
);

GalleryModel.plugin(uniqueValidator);

module.exports = mongoose.model("Gallery", GalleryModel);
