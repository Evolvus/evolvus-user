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
        "saltString": {
            "type": "string"
        },
        "token":{
            "type":"string"
        },
        "entity": {
            "type": "object",
            "properties": {
                "tenantId": {
                    "type": "string",
                    "minLength": 1,
                    "maxLength": 64
                },
                "entityCode": {
                    "type": "string",
                    "minLength": 1,
                    "maxLength": 50
                },
                "name": {
                    "type": "string",
                    "minLength": 1,
                    "maxLength": 50
                },
                "level": {
                    "type": "number"
                },
                "description": {
                    "type": "string",
                    "minLength": 1,
                    "maxLength": 255
                },
                "enable": {
                    "type": "boolean",
                    "default": "true"
                },
                "processingStatus": {
                    "type": "string"
                },
                "createdBy": {
                    "type": "string"
                },
                "createdDate": {
                    "type": "string",
                    "format": "date-time"
                },
                "parent": {
                    "type": "string"
                },
                "contact": {
                    "type": "object",
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
            "enum": ["ACTIVE", "INACTIVE"]
          },
          "processingStatus": {
            "type": "string",
            "enum": ["PENDING_AUTHORIZATION", "AUTHORIZED", "REJECTED"],
            "default": "PENDING_AUTHORIZATION"
          },
        "role": {
            "type": "object",
            "properties": {
                "tenantId": {
                    "type": "string",
                    "minLength": 1,
                    "maxLength": 64
                },
                "applicationCode": {
                    "type": "string",
                    "minLength": 3,
                    "maxLength": 20
                },
                "roleName": {
                    "type": "string",
                    "minLength": 1,
                    "maxLength": 20
                },
                "menuGroup": {
                    "type": "array",
                    "minItems": 1,
                    "items": {
                        "properties": {
                            "tenantId": {
                                "type": "string",
                                "minLength": 1,
                                "maxLength": 64
                            },
                            "applicationCode": {
                                "type": "string",
                                "minLength": 3,
                                "maxLength": 20
                            },
                            "menuGroupCode": {
                                "type": "string",
                                "minLength": 1,
                                "maxLength": 20
                            },
                            "title": {
                                "type": "string",
                                "minLength": 1,
                                "maxLength": 20
                            },
                            "selectedFlag": {
                                "type": "boolean",
                                "default": "false"
                            },
                            "menuGroupOrder": {
                                "type": "number"
                            },
                            "createdBy": {
                                "type": "string"
                            },
                            "createdDate": {
                                "type": "string",
                                "format": "date-time"
                            },
                            "menuItems": {
                                "type": "array",
                                "minItems": 1,
                                "items": {
                                    "properties": {
                                        "menuItemType": {
                                            "type": "string",
                                            "minLength": 1,
                                            "maxLength": 20
                                        },
                                        "applicationCode": {
                                            "type": "string",
                                            "minLength": 3,
                                            "maxLength": 20
                                        },
                                        "menuItemCode": {
                                            "type": "string",
                                            "minLength": 1,
                                            "maxLength": 20
                                        },
                                        "title": {
                                            "type": "string",
                                            "minLength": 1,
                                            "maxLength": 20
                                        },
                                        "selectedFlag": {
                                            "type": "boolean",
                                            "default": "false"
                                        },
                                        "menuItemOrder": {
                                            "type": "number",
                                            "required": "true"
                                        }
                                    },
                                    "required": ["menuItemType", "applicationCode", "menuItemCode", "title", "menuItemOrder"]
                                }
                            }
                        },
                        "required": ["tenantId", "applicationCode", "menuGroupCode", "menuGroupOrder", "title", "createdDate", "createdBy", "menuItems"]
                    }
                },
                "description": {
                    "type": "string",
                    "minLength": 0,
                    "maxLength": 255
                },
                "createdBy": {
                    "type": "string"
                },
                "updatedBy": {
                    "type": "string"
                },
                "createdDate": {
                    "type": "string",
                    "format": "date-time"
                },
                "lastUpdatedDate": {
                    "type": "string",
                    "format": "date-time"
                },
                "enableFlag": {
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
                },
                "associatedUsers": {
                    "type": "number"
                }
            }
        }
    },
    "required": ["tenantId", "userName", "userPassword", "createdBy", "createdDate", "lastUpdatedDate", "activationStatus", "processingStatus"]
};