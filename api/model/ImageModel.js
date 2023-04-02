"use strict";

const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const ImageModel = mongoose.Schema(
  {
    image: { 
      type: String, 
      required: true,
      unique: true
    },
    description: { 
      type: String, 
      required: true
    },
    gallery: { 
      type: String, 
      required: true
    }
  },
  {
    versionKey: false
  }
);

ImageModel.plugin(uniqueValidator);

module.exports = mongoose.model("Image", ImageModel);
