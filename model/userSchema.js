/*
 ** JSON Schema representation of the user model
 */
module.exports.schema = {
    "$schema": "http://json-schema.org/draft-06/schema#",
    "title": "userModel",
    "type": "object",
    "properties": {
        "tenantId": {
            "type": "string",
            "minLength": 1,
            "maxLength": 64
        },
        "userName": {
            "type": "string",
            "minLength": 1,
            "maxLength": 64
        },
        "userPassword": {
            "type": "string",
            "minLength": 1,
            "maxLength": 64
        },
        "branch": {
            "type": "object",
            "properties": {

                "tenantId": {
                    "type": "string",
                    "minLength": 1,
                    "maxLength": 64
                },
                "code": {
                    "type": "string",
                    "minLength": 1,
                    "maxLength": 50
                },
                "name": {
                    "type": "string",
                    "minLength": 1,
                    "maxLength": 50
                },
                "contact": {
                    "properties": {
                        "tenantId": {
                            "type": "string",
                            "minLength": 1,
                            "maxLength": 64
                        },
                        "firstName": {
                            "type": "string",
                            "minLength": 1,
                            "maxLength": 50
                        },
                        "middleName": {
                            "type": "string",
                            "minLength": 1,
                            "maxLength": 50
                        },
                        "lastName": {
                            "type": "string",
                            "minLength": 1,
                            "maxLength": 50
                        },
                        "email": {
                            "type": "string",
                            "minLength": 8,
                            "maxLength": 50
                        },
                        "emailVerified": {
                            "type": "boolean"
                        },
                        "phoneNo": {
                            "type": "string",
                            "minLength": 5,
                            "maxLength": 15
                        },
                        "mobileNo": {
                            "type": "string",
                            "minLength": 5,
                            "maxLength": 15
                        },
                        "mobileVerified": {
                            "type": "boolean"
                        },
                        "faxNumber": {
                            "type": "string",
                            "minLength": 1,
                            "maxLength": 15
                        },
                        "companyName": {
                            "type": "string",
                            "minLength": 1,
                            "maxLength": 64
                        },
                        "Address1": {
                            "type": "string"
                        },
                        "Address2": {
                            "type": "string"
                        },
                        "city": {
                            "type": "string"
                        },
                        "state": {
                            "type": "string"
                        },
                        "country": {
                            "type": "string"
                        },
                        "zipCode": {
                            "type": "string"
                        }
                    }
                }
            }
        },
        "contact": {
            "type": "object",
            "properties": {
                "firstName": {
                    "type": "string",
                    "minLength": 1,
                    "maxLength": 50
                },
                "middleName": {
                    "type": "string",
                    "minLength": 1,
                    "maxLength": 50
                },
                "lastName": {
                    "type": "string",
                    "minLength": 1,
                    "maxLength": 50
                },
                "email": {
                    "type": "string",
                    "minLength": 8,
                    "maxLength": 50
                },
                "emailVerified": {
                    "type": "boolean"
                },
                "phoneNo": {
                    "type": "string",
                    "minLength": 5,
                    "maxLength": 15
                },
                "mobileNo": {
                    "type": "string",
                    "minLength": 5,
                    "maxLength": 15
                },
                "mobileVerified": {
                    "type": "boolean"
                },
                "faxNumber": {
                    "type": "string",
                    "minLength": 1,
                    "maxLength": 15
                },
                "companyName": {
                    "type": "string",
                    "minLength": 1,
                    "maxLength": 64
                },
                "Address1": {
                    "type": "string"
                },
                "Address2": {
                    "type": "string"
                },
                "city": {
                    "type": "string"
                },
                "state": {
                    "type": "string"
                },
                "country": {
                    "type": "string"
                },
                "zipCode": {
                    "type": "string"
                }
            }
        },
        "createdBy": {
            "type": "string"
        },
        "updatedBy": {
            "type": ["string", "null"]
        },
        "createdDate": {
            "type": "string",
            "format": "date-time"
        },
        "lastUpdatedDate": {
            "type": ["string", "null"],
            "format": "date-time"
        },
        "enabledFlag": {
            "type": "number",
            "default": 1
        },
        "deletedFlag": {
            "type": "number",
            "default": 0
        },
        "activationStatus": {
            "type": "string",
            "enum": ["active", "inactive"]
        },
        "processingStatus": {
            "type": "string",
            "enum": ["authorized", "unauthorized", "rejected"]
        }
    },
    "required": ["tenantId", "userName", "userPassword", "createdBy", "createdDate", "lastUpdatedDate", "activationStatus", "processingStatus"]
};