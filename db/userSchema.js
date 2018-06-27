const mongoose = require("mongoose");
const validator = require("validator");
const passwordValidator = require("password-validator");

var schema = new passwordValidator();
schema
  .is()
  .min(8)
  .is()
  .max(100)
  .has()
  .uppercase()
  .has()
  .lowercase()
  .has()
  .digits()
  .has()
  .not()
  .spaces();

const {
  branch
} = require('evolvus-entity');
var {contact} = require('evolvus-contact');
var Branch = mongoose.model("branchCollection", branch.branchDBschema);
var Contact = mongoose.model("contactCollection",contact.contactDBschema);

var userSchema = new mongoose.Schema({
  // Add all attributes below tenantId
  tenantId: {
    type: String,
    required: true,
    minLength: 1,
    maxLength: 64
  },
  contact: {
    type: Object,
    ref: 'Contact'
  },
  branch: {
    type: Object,
    ref: 'Branch'
  },
  userName: {
    type: String,
    required: true
  },
  userPassword: {
    type: String,
    required: true,
    validate: {
      validator: (val) => {
        return schema.validate(val);
      },
      message: "Password must contain atleast one uppercase letter,lowercase,one digit and should not have spaces."
    }
  },
  createdBy: {
    type: String,
    required: true
  },
  updatedBy: {
    type: String
  },
  createdDate: {
    type: Date,
    required: true
  },
  lastUpdatedDate: {
    type: Date
  },
  enabledFlag: {
    type: Number,
    default: 1
  },
  deletedFlag: {
    type: Number,
    default: 0
  },
  activationStatus: {
    type: String
  },
  processingStatus: {
    type: String
  }

});

module.exports = userSchema;
