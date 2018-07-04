const mongoose = require('mongoose');
const validator = require('validator');

const { application } = require('evolvus-application');
const { role } = require('evolvus-role');
const { entity } = require('evolvus-entity');
const { contact } = require("evolvus-contact");
const { supportedDateFormats } = require("evolvus-supported-date-formats");
const { masterTimeZone } = require("evolvus-master-time-zone");
const { masterCurrency } = require("evolvus-master-currency");

const Application = mongoose.model("applicationCollection", application.applicationDBSchema);
const Contact = mongoose.model("contactCollection", contact.contactDBschema);
const Entity = mongoose.model("entityCollection", entity.entityDBschema);
const Role = mongoose.model("roleCollection", role.roleDBschema);
const SupportedDateFormats = mongoose.model("supportedDateFormatsCollection", supportedDateFormats.supportedDateFormatsDBSchema);
const MasterCurrency = mongoose.model("masterCurrencyCollection", masterCurrency.masterCurrencyDBSchema);
const MasterTimeZone = mongoose.model("masterTimeZoneCollection", masterTimeZone.masterTimeZoneDBSchema);

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
            validator: function (v) {
                return /^[ A-Za-z0-9_-]*$/.test(v);
            },
            message: "{PATH} can contain only numbers and . "
        }
    },
    application: {
        type: Object,
        ref: 'Application',
        required: true
    },
    contact: {
        type: Object,
        ref: 'Contact',
        required: true
    },
    entity: {
        type: Object,
        ref: 'Entity',
        required: true
    },
    role: {
        type: Object,
        ref: 'Role',
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
        type: Object,
        ref: 'SupportedDateFormats',
        required: true
    },
    masterCurrency: {
        type: Object,
        ref: 'MasterCurrency',
        required: true
    },
    masterTimeZone: {
        type: Object,
        ref: 'MasterTimeZone',
        required: true
    },
    designation: {
        type: String,
        min: 6,
        max: 35,
        validate: {
            validator: function (v) {
                return /^[ A-Za-z0-9_@.,;:/&!^*(){}[\]?$%#&=+-]*$/.test(v);
            },
            message: "{PATH} can contain only alphabets and numbers and specialcharacters"
        }
    },
    dailyLimit: {
        type: Number,
        validate: {
            validator: function (v) {
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
            validator: function (v) {
                return /^[0-9.]*$/.test(v);
            },
            message: "{PATH} can contain only numbers and . "
        }
    }

});

module.exports = userSchema;
