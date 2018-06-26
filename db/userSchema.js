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
    }

});

module.exports = userSchema;