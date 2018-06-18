const mongoose = require(mongoose);
const validator = require(validator);

var branchSchema = require('evolvus-branch').branchSchema;
var contactSchema = require('evolvus-contact').contactSchema;

var userSchema = new mongoose.Schema({
    // Add all attributes below tenantId
    tenantId: {
        type: String,
        required: true,
        minLength: 1,
        maxLength: 64
    },
    contact: contactSchema,
    branch: branchSchema,
    userName: {
        type: String,
        required: true
    },
    userPassword: {
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
        type: number,
        default: 1
    },
    deletedFlag: {
        type: number,
        default: 0
    },
    activationStatus: {
        type: string
    },
    processingStatus: {
        type: string
    }

});

module.exports = userSchema;