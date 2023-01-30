"use strict";

const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const UserModel = mongoose.Schema(
  {
    name: { 
      type: String, 
      required: true,
      unique: true
    },
    email: { 
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
    pass: { 
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

UserModel.plugin(uniqueValidator);

module.exports = mongoose.model("User", UserModel);
