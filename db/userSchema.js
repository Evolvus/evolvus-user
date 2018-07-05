const mongoose = require('mongoose');
const validator = require('validator');

// const {
//   application
// } = require('evolvus-application');
// const {
//   role
// } = require('evolvus-role');
// const {
//   entity
// } = require('evolvus-entity');
// const {
//   contact
// } = require("evolvus-contact");
// const {
//   supportedDateFormats
// } = require("evolvus-supported-date-formats");
// const {
//   masterTimeZone
// } = require("evolvus-master-time-zone");
// const {
//   masterCurrency
// } = require("evolvus-master-currency");

//const Application = mongoose.model("application", application.applicationDBschema);
// const Contact = mongoose.model("contacts", contact.contactDBschema);
// const Entity = mongoose.model("entity", entity.entityDBschema);
// const Role = mongoose.model("role", role.roleDBschema);
// const SupportedDateFormats = mongoose.model("supportedDateFormatsCollection", supportedDateFormats.supportedDateFormatsDBSchema);
// const MasterCurrency = mongoose.model("masterCurrencyCollection", masterCurrency.masterCurrencyDBSchema);
// const MasterTimeZone = mongoose.model("masterTimeZoneCollection", masterTimeZone.masterTimeZoneDBSchema);

var userSchema = new mongoose.Schema({
  // Add all attributes below tenantId
  tenantId: {
    type: String,
    required: true,
    min: 1,
    max: 64
  },
  userId: {
    type: String,
    required: true,
    min: 6,
    max: 35,
    validate: {
      validator: function(v) {
        return /^[ A-Za-z0-9_-]*$/.test(v);
      },
      message: "{PATH} can contain only alphanumeric and _ -"
    }
  },
  application: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'applicationCollection',
    required: true
  },
  contact: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'contactCollection',
    required: true
  },
  entity: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'entityCollection',
    required: true
  },
  role: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'roleCollection',
    required: true
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
    type: String,
    enum: ["ACTIVE", "INACTIVE"],
    default:"ACTIVE",
    required: true
  },
  processingStatus: {
    type: String,
    enum: ['PENDING_AUTHORIZATION', 'AUTHORIZED', 'REJECTED'],
    default: 'PENDING_AUTHORIZATION'
  },
  token: {
    type: String
  },
  supportedDateFormats: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'SupportedDateFormats'
  },
  masterCurrency: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'MasterCurrency'
  },
  masterTimeZone: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'MasterTimeZone'
  },
  designation: {
    type: String,
    min: 6,
    max: 35,
    validate: {
      validator: function(v) {
        return /^[ A-Za-z0-9_@.,;:/&!^*(){}[\]?$%#&=+-]*$/.test(v);
      },
      message: "{PATH} can contain only alphabets and numbers and specialcharacters"
    }
  },
  dailyLimit: {
    type: Number,
    validate: {
      validator: function(v) {
        return /^[0-9.]*$/.test(v);
      },
      message: "{PATH} can contain only numbers and ."
    }
  },
  individualTransactionLimit: {
    type: Number,
    minLength: 16,
    maxLength: 16,
    validate: {
      validator: function(v) {
        return /^[0-9.]*$/.test(v);
      },
      message: "{PATH} can contain only numbers and . "
    }
  }

});

module.exports = userSchema;