<<<<<<< HEAD
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
=======
const mongoose = require('mongoose');
const validator = require('validator');

const { application } = require('evolvus-application');
const { role } = require('evolvus-role');
const { entity } = require('evolvus-entity');
const { contact } = require("evolvus-contact");

const Application = mongoose.model("applicationCollection", application.applicationDBSchema);
const Contact = mongoose.model("contactCollection", contact.contactDBschema);
const Entity = mongoose.model("entityCollection", entity.entityDBschema);
const Role = mongoose.model("roleCollection", role.roleDBschema);

var userSchema = new mongoose.Schema({
    // Add all attributes below tenantId
    tenantId: {
        type: String,
        required: true,
        minLength: 1,
        maxLength: 64
    },
    application: {
        type: Object,
        ref: 'Application'
    },
    contact: {
        type: Object,
        ref: 'Contact'
    },
    entity: {
        type: Object,
        ref: 'Entity'
    },
    role: {
        type: Object,
        ref: 'Role'
    },
    userName: {
        type: String,
        required: true
    },
    userPassword: {
        type: String,
        required: true
    },
    saltString: {
        type: String,
        required: true
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
>>>>>>> fe91db44542790122e80400467f26ae5ec2b12c7
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
