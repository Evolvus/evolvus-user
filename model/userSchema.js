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
    "userId": {
      "type": "string",
      "minLength": 6,
      "maxLength": 35,
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
    "token": {
      "type": "string"
    },
    "supportedDateFormats": {
      "type": "object",
      "properties": {
        "tenantId": {
          "type": "string",
          "minLength": 1,
          "maxLength": 64
        },
        "formatCode": {
          "type": "string",
          "unique": true,
          "minLength": 1,
          "maxLength": 50
        },
        "timeFormat": {
          "type": "string",
          "minLength": 1,
          "maxLength": 50
        },
        "description": {
          "type": "string",
          "minLength": 1,
          "maxLength": 100
        },
        "createdDate": {
          "type": "string",
          "format": "date-time"
        },
        "lastUpdatedDate": {
          "type": "string",
          "format": "date-time"
        },
        "createdBy": {
          "type": "string",
          "minLength": 1,
          "maxLength": 100
        },
        "updatedBy": {
          "type": "string",
          "minLength": 1,
          "maxLength": 100
        },
        "objVersion": {
          "type": "number"
        },
        "enabledFlag": {
          "type": "string",
          "default": "1",
          "enum": ["0", "1"]
        }
      },
      "required": ["tenantId", "formatCode"]
    },
    "masterCurrency": {
      "type": "object",
      "properties": {
        "tenantId": {
          "type": "string",
          "minLength": 1,
          "maxLength": 64
        },
        "currencyCode": {
          "type": "string",
          "minLength": 1,
          "maxLength": 5,
          "unique": true
        },
        "currencyName": {
          "type": "string",
          "minLength": 1,
          "maxLength": 50,

        },
        "decimalDigit": {
          "type": "string"

        },
        "delimiter": {
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
        "createdBy": {
          "type": "string",
          "minLength": 1,
          "maxLength": 100
        },
        "updatedBy": {
          "type": "string",
          "minLength": 1,
          "maxLength": 100
        },
        "objVersion": {
          "type": "number"
        },
        "enabledFlag": {
          "type": "string",
          "default": "1",
          "enum": ["0", "1"]
        },
        "currencyLocale": {
          "type": "string"
        }
      },
      "required": ["tenantId", "currencyCode", "currencyName"]
    },
    "masterTimeZone": {
      "type": "object",
      "properties": {
        "tenantId": {
          "type": "string",
          "minLength": 1,
          "maxLength": 64
        },
        "zoneCode": {
          "type": "string",
          "minLength": 1,
          "maxLength": 50
        },
        "zoneName": {
          "type": "string",
          "minLength": 1,
          "maxLength": 50
        },
        "offsetValue": {
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
        "createdBy": {
          "type": "string",
          "minLength": 1,
          "maxLength": 100
        },
        "updatedBy": {
          "type": "string",
          "minLength": 1,
          "maxLength": 100
        },
        "offSet": {
          "type": "string"
        },
        "objVersion": {
          "type": "number"
        },
        "enableFlag": {
          "type": "string",
          "default": "1",
          "enum": ["0", "1"]
        }
      },
      "required": ["tenantId", "zoneCode", "zoneName"]
    },
    "entity": {
      "type": "string"
      // "properties": {
      //   "tenantId": {
      //     "type": "string",
      //     "minLength": 1,
      //     "maxLength": 64
      //   },
      //   "entityCode": {
      //     "type": "string",
      //     "minLength": 1,
      //     "maxLength": 50
      //   },
      //   "name": {
      //     "type": "string",
      //     "minLength": 1,
      //     "maxLength": 50
      //   },
      //   "level": {
      //     "type": "number"
      //   },
      //   "description": {
      //     "type": "string",
      //     "minLength": 1,
      //     "maxLength": 255
      //   },
      //   "enable": {
      //     "type": "boolean",
      //     "default": "true"
      //   },
      //   "processingStatus": {
      //     "type": "string"
      //   },
      //   "createdBy": {
      //     "type": "string"
      //   },
      //   "createdDate": {
      //     "type": "string",
      //     "format": "date-time"
      //   },
      //   "parent": {
      //     "type": "string"
      //   },
      //   "contact": {
      //     "type": "object",
      //     "properties": {
      //       "tenantId": {
      //         "type": "string",
      //         "minLength": 1,
      //         "maxLength": 64
      //       },
      //       "firstName": {
      //         "type": "string",
      //         "minLength": 1,
      //         "maxLength": 50
      //       },
      //       "middleName": {
      //         "type": "string",
      //         "minLength": 1,
      //         "maxLength": 50
      //       },
      //       "lastName": {
      //         "type": "string",
      //         "minLength": 1,
      //         "maxLength": 50
      //       },
      //       "email": {
      //         "type": "string",
      //         "minLength": 8,
      //         "maxLength": 50
      //       },
      //       "emailVerified": {
      //         "type": "boolean"
      //       },
      //       "phoneNo": {
      //         "type": "string",
      //         "minLength": 5,
      //         "maxLength": 15
      //       },
      //       "mobileNo": {
      //         "type": "string",
      //         "minLength": 5,
      //         "maxLength": 15
      //       },
      //       "mobileVerified": {
      //         "type": "boolean"
      //       },
      //       "faxNumber": {
      //         "type": "string",
      //         "minLength": 1,
      //         "maxLength": 15
      //       },
      //       "companyName": {
      //         "type": "string",
      //         "minLength": 1,
      //         "maxLength": 64
      //       },
      //       "Address1": {
      //         "type": "string"
      //       },
      //       "Address2": {
      //         "type": "string"
      //       },
      //       "city": {
      //         "type": "string"
      //       },
      //       "state": {
      //         "type": "string"
      //       },
      //       "country": {
      //         "type": "string"
      //       },
      //       "zipCode": {
      //         "type": "string"
      //       }
      //     }
      //   }
      // }
    },
    "contact": {
      "type": "string"
      // "properties": {
      //   "firstName": {
      //     "type": "string",
      //     "minLength": 1,
      //     "maxLength": 50
      //   },
      //   "middleName": {
      //     "type": "string",
      //     "minLength": 1,
      //     "maxLength": 50
      //   },
      //   "lastName": {
      //     "type": "string",
      //     "minLength": 1,
      //     "maxLength": 50
      //   },
      //   "email": {
      //     "type": "string",
      //     "minLength": 8,
      //     "maxLength": 50
      //   },
      //   "emailVerified": {
      //     "type": "boolean"
      //   },
      //   "phoneNo": {
      //     "type": "string",
      //     "minLength": 5,
      //     "maxLength": 15
      //   },
      //   "mobileNo": {
      //     "type": "string",
      //     "minLength": 5,
      //     "maxLength": 15
      //   },
      //   "mobileVerified": {
      //     "type": "boolean"
      //   },
      //   "faxNumber": {
      //     "type": "string",
      //     "minLength": 1,
      //     "maxLength": 15
      //   },
      //   "companyName": {
      //     "type": "string",
      //     "minLength": 1,
      //     "maxLength": 64
      //   },
      //   "Address1": {
      //     "type": "string"
      //   },
      //   "Address2": {
      //     "type": "string"
      //   },
      //   "city": {
      //     "type": "string"
      //   },
      //   "state": {
      //     "type": "string"
      //   },
      //   "country": {
      //     "type": "string"
      //   },
      //   "zipCode": {
      //     "type": "string"
      //   }
      // }
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
    "dailyLimit": {
      "type": "number",
      "minLength": 16,
      "maxLength": 16
    },
    "individualTransactionLimit": {
      "type": "number",
      "minLength": 16,
      "maxLength": 16
    },
    "designation": {
      "type": "string",
      "minLength": 6,
      "maxLength": 35
    },
    "role": {
      "type": "string"
      // "properties": {
      //   "tenantId": {
      //     "type": "string",
      //     "minLength": 1,
      //     "maxLength": 64
      //   },
      //   "applicationCode": {
      //     "type": "string",
      //     "minLength": 3,
      //     "maxLength": 20
      //   },
      //   "roleName": {
      //     "type": "string",
      //     "minLength": 1,
      //     "maxLength": 20
      //   },
      //   "menuGroup": {
      //     "type": "array",
      //     "minItems": 1,
      //     "items": {
      //       "properties": {
      //         "tenantId": {
      //           "type": "string",
      //           "minLength": 1,
      //           "maxLength": 64
      //         },
      //         "applicationCode": {
      //           "type": "string",
      //           "minLength": 3,
      //           "maxLength": 20
      //         },
      //         "menuGroupCode": {
      //           "type": "string",
      //           "minLength": 1,
      //           "maxLength": 20
      //         },
      //         "title": {
      //           "type": "string",
      //           "minLength": 1,
      //           "maxLength": 20
      //         },
      //         "selectedFlag": {
      //           "type": "boolean",
      //           "default": "false"
      //         },
      //         "menuGroupOrder": {
      //           "type": "number"
      //         },
      //         "createdBy": {
      //           "type": "string"
      //         },
      //         "createdDate": {
      //           "type": "string",
      //           "format": "date-time"
      //         },
      //         "menuItems": {
      //           "type": "array",
      //           "minItems": 1,
      //           "items": {
      //             "properties": {
      //               "menuItemType": {
      //                 "type": "string",
      //                 "minLength": 1,
      //                 "maxLength": 20
      //               },
      //               "applicationCode": {
      //                 "type": "string",
      //                 "minLength": 3,
      //                 "maxLength": 20
      //               },
      //               "menuItemCode": {
      //                 "type": "string",
      //                 "minLength": 1,
      //                 "maxLength": 20
      //               },
      //               "title": {
      //                 "type": "string",
      //                 "minLength": 1,
      //                 "maxLength": 20
      //               },
      //               "selectedFlag": {
      //                 "type": "boolean",
      //                 "default": "false"
      //               },
      //               "menuItemOrder": {
      //                 "type": "number",
      //                 "required": "true"
      //               }
      //             },
      //             "required": ["menuItemType", "applicationCode", "menuItemCode", "title", "menuItemOrder"]
      //           }
      //         }
      //       },
      //       "required": ["tenantId", "applicationCode", "menuGroupCode", "menuGroupOrder", "title", "createdDate", "createdBy", "menuItems"]
      //     }
      //   },
      //   "description": {
      //     "type": "string",
      //     "minLength": 0,
      //     "maxLength": 255
      //   },
      //   "createdBy": {
      //     "type": "string"
      //   },
      //   "updatedBy": {
      //     "type": "string"
      //   },
      //   "createdDate": {
      //     "type": "string",
      //     "format": "date-time"
      //   },
      //   "lastUpdatedDate": {
      //     "type": "string",
      //     "format": "date-time"
      //   },
      //   "enableFlag": {
      //     "type": "string",
      //     "enum": ["0", "1"]
      //   },
      //   "deletedFlag": {
      //     "type": "string",
      //     "enum": ["0", "1"],
      //     "default": "0"
      //   },
      //   "activationStatus": {
      //     "type": "string",
      //     "enum": ["ACTIVE", "INACTIVE"],
      //     "default":"ACTIVE"
      //   },
      //   "processingStatus": {
      //     "type": "string",
      //     "enum": ["PENDING_AUTHORIZATION", "AUTHORIZED", "REJECTED"],
      //     "default": "PENDING_AUTHORIZATION"
      //   },
      //   "associatedUsers": {
      //     "type": "number"
      //   }
      // }
    }
  },
  "required": ["tenantId", "userId", "userName", "userPassword", "createdBy", "createdDate", "lastUpdatedDate", "activationStatus",
    "processingStatus", "contact", "role", "entity"
  ]
};