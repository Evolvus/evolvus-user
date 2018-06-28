const debug = require("debug")("evolvus-user.test.db.user");
const mongoose = require("mongoose");
const chai = require("chai");
const chaiAsPromised = require("chai-as-promised");
const expect = chai.expect;
const user = require("../../db/user");

var MONGO_DB_URL = process.env.MONGO_DB_URL || "mongodb://10.10.69.204/TestPlatform_Dev";

chai.use(chaiAsPromised);

// High level wrapper
// Testing db/user.js
describe("db user testing", () => {
  /*
   ** Before doing any tests, first get the connection.
   */
  before((done) => {
    mongoose.connect(MONGO_DB_URL);
    let connection = mongoose.connection;
    connection.once("open", () => {
      debug("ok got the connection");
      done();
    });
  });

  let object1 = {
    // add a valid user object
    tenantId: "IVL",
    userName: "kavyak",
    userPassword: "evolvus*123",
    entity: {
      tenantId: "IVL",
      code: "IBB123",
      name: "MGRoad",
      contact: {
        tenantId: "IVL",
        firstName: "pavithra",
        middleName: "T",
        lastname: "Thimmappa",
        email: "Pavithrakit30@gmail.com",
        emailVerified: true,
        phoneNo: "7708387760",
        mobileNo: "9999888800",
        mobileVerified: false,
        faxNumber: "12345678fax",
        companyName: "Evolvus",
        Address1: "Banglore",
        Address2: "Banglore",
        city: "Banglore",
        state: "karnataka",
        country: "India",
        zipCode: "kct123"
      }
    },
    contact: {
      tenantId: "IVL",
      firstName: "pavithra",
      middleName: "T",
      lastname: "Thimmappa",
      email: "Pavithrakit130@gmail.com",
      emailVerified: true,
      phoneNo: "7708387761",
      mobileNo: "9999888801",
      mobileVerified: false,
      faxNumber: "12345678fax",
      companyName: "Evolvus",
      Address1: "Banglore",
      Address2: "Banglore",
      city: "Banglore",
      state: "karnataka",
      country: "India",
      zipCode: "kct123"
    },
    application: {
      applicationName: "Docket",
      applicationCode: "DOCK",
      createdBy: "Kavya",
      createdDate: new Date().toISOString(),
      updatedDate: new Date().toISOString()
    },
    role: {
      tenantId: "tid",
      entityCode: "Entityent",
      accessLevel: "0",
      applicationCode: "CDA",
      roleName: "admin",
      menuGroup: [{
        tenantId: "tid",
        applicationCode: "CDA",
        menuGroupCode: "mgc",
        title: "menugroup title",
        menuItems: [{
          menuItemType: "queues",
          applicationCode: "CDA",
          menuItemCode: "mic",
          title: "menuItem title"
        }, {
          menuItemType: "queues",
          applicationCode: "RTP",
          menuItemCode: "mic",
          title: "menuItem title"
        }]
      }],
      description: "role",
      activationStatus: "ACTIVE",
      associatedUsers: 5,
      createdBy: "kamalarani",
      createdDate: new Date().toISOString(),
      lastUpdatedDate: new Date().toISOString()
    },
    createdBy: "pavithra",
    updatedBy: "pavithra",
    createdDate: new Date().toISOString(),
    lastUpdatedDate: new Date().toISOString(),
    enabledFlag: 1,
    deletedFlag: 0,
    activationStatus: "ACTIVE",
    processingStatus: "AUTHORIZED",
    token: null
  };
  let object2 = {
    // add a valid user object
    tenantId: "IVL",
    userName: "pavithra2",
    userPassword: "Pavithra@30",
    branch: {
      tenantId: "IVL",
      code: "IBB123",
      name: "Hosur",
      contact: {
        tenantId: "IVL",
        firstName: "pavithra",
        middleName: "T",
        lastname: "Thimmappa",
        email: "Pavithrakit230@gmail.com",
        emailVerified: true,
        phoneNo: "7708387762",
        mobileNo: "9999888802",
        mobileVerified: false,
        faxNumber: "12345678fax",
        companyName: "Evolvus",
        Address1: "Banglore",
        Address2: "Banglore",
        city: "Banglore",
        state: "karnataka",
        country: "India",
        zipCode: "kct123"
      }
    },
    contact: {
      tenantId: "IVL",
      firstName: "pavithra",
      middleName: "T",
      lastname: "Thimmappa",
      email: "Pavithrakit330@gmail.com",
      emailVerified: true,
      phoneNo: "7708387763",
      mobileNo: "9999888803",
      mobileVerified: false,
      faxNumber: "12345678fax",
      companyName: "Evolvus",
      Address1: "Banglore",
      Address2: "Banglore",
      city: "Banglore",
      state: "karnataka",
      country: "India",
      zipCode: "kct123"
    },
    createdBy: "pavithra",
    updatedBy: "pavithra",
    createdDate: new Date().toISOString(),
    lastUpdatedDate: new Date().toISOString(),
    enabledFlag: 1,
    deletedFlag: 0,
    activationStatus: "active",
    processingStatus: "unauthorized"
  };

  describe("testing user.save", () => {
    // Testing save
    // 1. Valid user should be saved.
    // 2. Non user object should not be saved.
    // 3. Should not save same user twice.
    beforeEach((done) => {
      user.deleteAll()
        .then((data) => {
          done();
        });
    });

    it("should save valid user to database", (done) => {
      let res = user.save(object1);
      expect(res).to.eventually.not.have.property('userPassword');
      expect(res).to.eventually.not.have.property('saltString');
      done();
    });

    // it("should fail saving invalid object to database", (done) => {
    //   // not even a  object

    //   let invalidObject = {
    //     // add a invalid user object
    //     userName: "pavithra",
    //     userPassword: "Pavithra@30",
    //     branch: {
    //       tenantId: "IVL",
    //       code: "IBB123",
    //       name: "Hosur",
    //       contact: {
    //         tenantId: "IVL",
    //         firstName: "pavithra",
    //         middleName: "T",
    //         lastname: "Thimmappa",
    //         email: "Pavithrakit1130@gmail.com",
    //         emailVerified: true,
    //         phoneNo: "7708387769",
    //         mobileNo: "9999888809",
    //         mobileVerified: false,
    //         faxNumber: "12345678fax",
    //         companyName: "Evolvus",
    //         Address1: "Banglore",
    //         Address2: "Banglore",
    //         city: "Banglore",
    //         state: "karnataka",
    //         country: "India",
    //         zipCode: "kct123"

    //       }
    //     },
    //     contact: {
    //       tenantId: "IVL",
    //       firstName: "pavithra",
    //       middleName: "T",
    //       lastname: "Thimmappa",
    //       email: "Pavithrakit1230@gmail.com",
    //       emailVerified: true,
    //       phoneNo: "7708387711",
    //       mobileNo: "99998888011",
    //       mobileVerified: false,
    //       faxNumber: "12345678fax",
    //       companyName: "Evolvus",
    //       Address1: "Banglore",
    //       Address2: "Banglore",
    //       city: "Banglore",
    //       state: "karnataka",
    //       country: "India",
    //       zipCode: "kct123"
    //     },
    //     createdBy: "pavithra",
    //     updatedBy: "pavithra",
    //     createdDate: new Date().toISOString(),
    //     lastUpdatedDate: new Date().toISOString(),
    //     enabledFlag: 1,
    //     deletedFlag: 0,
    //     activationStatus: "active",
    //     processingStatus: "unauthorized"
    //   };
    //   let res = user.save(invalidObject);
    //   expect(res)
    //     .to.be.eventually.rejectedWith("userCollection validation failed")
    //     .notify(done);
    // });
  });


  // describe("testing user.findAll by limit", () => {
  //   // 1. Delete all records in the table and insert
  //   //    4 new records.
  //   // find -should return an array of size equal to value of limit with the
  //   // roleMenuItemMaps.
  //   // Caveat - the order of the roleMenuItemMaps fetched is indeterminate

  //   // delete all records and insert four roleMenuItemMaps
  //   beforeEach((done) => {
  //     user.deleteAll().then(() => {
  //       user.save(object1).then((res) => {
  //         user.save(object2).then((res) => {
  //           user.save(object3).then((res) => {
  //             user.save(object4).then((res) => {
  //               done();
  //             });
  //           });
  //         });
  //       });
  //     });
  //   });

  //   it("should return limited number of records", (done) => {
  //     let res = user.findAll(3);
  //     expect(res)
  //       .to.be.fulfilled.then((docs) => {
  //         expect(docs)
  //           .to.be.a('array');
  //         expect(docs.length)
  //           .to.equal(3);
  //         expect(docs[0])
  //           .to.have.property('userName')
  //           .to.eql('pavithra');
  //         done();
  //       }, (err) => {
  //         done(err);
  //       })
  //       .catch((e) => {
  //         done(e);
  //       });
  //   });

  //   it("should return all records if value of limit parameter is less than 1 i.e, 0 or -1", (done) => {
  //     let res = user.findAll(-1);
  //     expect(res)
  //       .to.be.fulfilled.then((docs) => {
  //         expect(docs)
  //           .to.be.a('array');
  //         expect(docs.length)
  //           .to.equal(4);
  //         expect(docs[0])
  //           .to.have.property('userName')
  //           .to.eql('pavithra');
  //         done();
  //       }, (err) => {
  //         done(err);
  //       })
  //       .catch((e) => {
  //         done(e);
  //       });
  //   });
  // });

  // describe("testing user.find without data", () => {
  //   // delete all records
  //   // find should return empty array
  //   beforeEach((done) => {
  //     user.deleteAll()
  //       .then((res) => {
  //         done();
  //       });
  //   });

  //   it("should return empty array i.e. []", (done) => {
  //     let res = user.findAll(2);
  //     expect(res)
  //       .to.be.fulfilled.then((docs) => {
  //         expect(docs)
  //           .to.be.a('array');
  //         expect(docs.length)
  //           .to.equal(0);
  //         expect(docs)
  //           .to.eql([]);
  //         done();
  //       }, (err) => {
  //         done(err);
  //       })
  //       .catch((e) => {
  //         done(e);
  //       });
  //   });
  // });

  // describe("testing user.findById", () => {
  //   // Delete all records, insert one record , get its id
  //   // 1. Query by this id and it should return one user
  //   // 2. Query by an arbitrary id and it should return {}
  //   // 3. Query with null id and it should throw IllegalArgumentException
  //   // 4. Query with undefined and it should throw IllegalArgumentException
  //   // 5. Query with arbitrary object
  //   let testObject = {
  //     //add a valid user object
  //     tenantId: "IVL",
  //     userName: "pavithra",
  //     userPassword: "Pavithra@30",
  //     branch: {
  //       tenantId: "IVL",
  //       code: "IBB123",
  //       name: "Hosur",
  //       contact: {
  //         tenantId: "IVL",
  //         firstName: "pavithra",
  //         middleName: "T",
  //         lastname: "Thimmappa",
  //         email: "Pavithrakit1330@gmail.com",
  //         emailVerified: true,
  //         phoneNo: "7708387712",
  //         mobileNo: "9999888812",
  //         mobileVerified: false,
  //         faxNumber: "12345678fax",
  //         companyName: "Evolvus",
  //         Address1: "Banglore",
  //         Address2: "Banglore",
  //         city: "Banglore",
  //         state: "karnataka",
  //         country: "India",
  //         zipCode: "kct123"

  //       }
  //     },
  //     contact: {

  //       tenantId: "IVL",
  //       firstName: "pavithra",
  //       middleName: "T",
  //       lastname: "Thimmappa",
  //       email: "Pavithrakit1430@gmail.com",
  //       emailVerified: true,
  //       phoneNo: "7708387713",
  //       mobileNo: "9999888813",
  //       mobileVerified: false,
  //       faxNumber: "12345678fax",
  //       companyName: "Evolvus",
  //       Address1: "Banglore",
  //       Address2: "Banglore",
  //       city: "Banglore",
  //       state: "karnataka",
  //       country: "India",
  //       zipCode: "kct123"
  //     },
  //     createdBy: "pavithra",
  //     updatedBy: "pavithra",
  //     createdDate: new Date().toISOString(),
  //     lastUpdatedDate: new Date().toISOString(),
  //     enableFlag: 1,
  //     deletedFlag: 0,
  //     activationStatus: "active",
  //     processingStatus: "unauthorized"
  //   };
  //   var id;
  //   beforeEach((done) => {
  //     user.deleteAll()
  //       .then((res) => {
  //         user.save(testObject)
  //           .then((savedObj) => {
  //             id = savedObj._id;
  //             done();
  //           });
  //       });
  //   });

  //   it("should return user identified by Id ", (done) => {
  //     let res = user.findById(id);
  //     expect(res)
  //       .to.eventually.to.eventually.have.property('userName')
  //       .to.eql('pavithra')
  //       .notify(done);
  //   });

  //   it("should return null as no user is identified by this Id ", (done) => {
  //     let badId = new mongoose.mongo.ObjectId();
  //     let res = user.findById(badId);
  //     expect(res)
  //       .to.eventually.to.eql(null)
  //       .notify(done);
  //   });
  // });

  // describe("testing user.findOne", () => {
  //   // Delete all records, insert two record
  //   // 1. Query by one attribute and it should return one user
  //   // 2. Query by an arbitrary attribute value and it should return {}

  //   // delete all records and insert two users
  //   beforeEach((done) => {
  //     user.deleteAll()
  //       .then((res) => {
  //         user.save(object1)
  //           .then((res) => {
  //             user.save(object2)
  //               .then((savedObj) => {
  //                 done();
  //               });
  //           });
  //       });
  //   });

  //   it("should return object for valid attribute value", (done) => {
  //     // take one valid attribute and its value
  //     let attributename = "userName";
  //     let attributeValue = "pavithra";
  //     let res = user.findOne(attributename, attributeValue);
  //     expect(res)
  //       .to.eventually.to.eventually.to.eventually.have.property('userName')
  //       .to.eql('pavithra')
  //       .notify(done);
  //   });

  //   it("should return null as no user is identified by this attribute ", (done) => {
  //     let res = user.findOne("userName", "hkguyfbh");
  //     expect(res)
  //       .to.eventually.to.eql(null)
  //       .notify(done);
  //   });
  // });

  // describe("testing user.findMany", () => {
  //   // Delete all records, insert two record
  //   // 1. Query by one attribute and it should return all users having attribute value
  //   // 2. Query by an arbitrary attribute value and it should return {}
  //   let user1 = {
  //     //add valid object
  //     tenantId: "IVL",
  //     userName: "pavithra",
  //     userPassword: "Pavithra@30",
  //     branch: {
  //       tenantId: "IVL",
  //       code: "IBB123",
  //       name: "Hosur",
  //       contact: {
  //         tenantId: "IVL",
  //         firstName: "pavithra",
  //         middleName: "T",
  //         lastname: "Thimmappa",
  //         email: "Pavithrakit1530@gmail.com",
  //         emailVerified: true,
  //         phoneNo: "7708387714",
  //         mobileNo: "9999888814",
  //         mobileVerified: false,
  //         faxNumber: "12345678fax",
  //         companyName: "Evolvus",
  //         Address1: "Banglore",
  //         Address2: "Banglore",
  //         city: "Banglore",
  //         state: "karnataka",
  //         country: "India",
  //         zipCode: "kct123"

  //       }
  //     },
  //     contact: {

  //       tenantId: "IVL",
  //       firstName: "pavithra",
  //       middleName: "T",
  //       lastname: "Thimmappa",
  //       email: "Pavithrakit1630@gmail.com",
  //       emailVerified: true,
  //       phoneNo: "7708387715",
  //       mobileNo: "9999888815",
  //       mobileVerified: false,
  //       faxNumber: "12345678fax",
  //       companyName: "Evolvus",
  //       Address1: "Banglore",
  //       Address2: "Banglore",
  //       city: "Banglore",
  //       state: "karnataka",
  //       country: "India",
  //       zipCode: "kct123"
  //     },
  //     createdBy: "pavithra",
  //     updatedBy: "pavithra",
  //     createdDate: new Date().toISOString(),
  //     lastUpdatedDate: new Date().toISOString(),
  //     enableFlag: 1,
  //     deletedFlag: 0,
  //     activationStatus: "active",
  //     processingStatus: "unauthorized"
  //   };
  //   let user2 = {
  //     //add valid object with one attribute value same as "user1"
  //     tenantId: "IVL",
  //     userName: "pavithrat",
  //     userPassword: "Pavithra@30",
  //     branch: {
  //       tenantId: "IVL",
  //       code: "IBB123",
  //       name: "Hosur",
  //       contact: {
  //         tenantId: "IVL",
  //         firstName: "pavithra",
  //         middleName: "T",
  //         lastname: "Thimmappa",
  //         email: "Pavithrakit1730@gmail.com",
  //         emailVerified: true,
  //         phoneNo: "7708387716",
  //         mobileNo: "9999888816",
  //         mobileVerified: false,
  //         faxNumber: "12345678fax",
  //         companyName: "Evolvus",
  //         Address1: "Banglore",
  //         Address2: "Banglore",
  //         city: "Banglore",
  //         state: "karnataka",
  //         country: "India",
  //         zipCode: "kct123"

  //       }
  //     },
  //     contact: {

  //       tenantId: "IVL",
  //       firstName: "pavithra",
  //       middleName: "T",
  //       lastname: "Thimmappa",
  //       email: "Pavithrakit1830@gmail.com",
  //       emailVerified: true,
  //       phoneNo: "7708387717",
  //       mobileNo: "9999888817",
  //       mobileVerified: false,
  //       faxNumber: "12345678fax",
  //       companyName: "Evolvus",
  //       Address1: "Banglore",
  //       Address2: "Banglore",
  //       city: "Banglore",
  //       state: "karnataka",
  //       country: "India",
  //       zipCode: "kct123"
  //     },
  //     createdBy: "pavithra",
  //     updatedBy: "pavithra",
  //     createdDate: new Date().toISOString(),
  //     lastUpdatedDate: new Date().toISOString(),
  //     enableFlag: 1,
  //     deletedFlag: 0,
  //     activationStatus: "active",
  //     processingStatus: "unauthorized"
  //   };
  //   // delete all records and insert two users
  //   beforeEach((done) => {
  //     user.deleteAll()
  //       .then((res) => {
  //         user.save(user1)
  //           .then((res) => {
  //             user.save(user2)
  //               .then((savedObj) => {
  //                 done();
  //               });
  //           });
  //       });
  //   });

  //   it("should return array of objects for valid attribute value", (done) => {
  //     // take one valid attribute and its value
  //     let attributename = "userName";
  //     let attributeValue = "pavithra";
  //     let res = user.findMany(attributename, attributeValue);
  //     expect(res).to.eventually.be.a("array");
  //     //enter proper length according to input attribute
  //     expect(res).to.eventually.have.length(1);
  //     done();
  //   });

  //   it("should return empty array as no user is identified by this attribute ", (done) => {
  //     let res = user.findMany("userName", "jhgjh");
  //     expect(res)
  //       .to.eventually.to.eql([])
  //       .notify(done);
  //   });
  // });

  describe("testing user.autheticate ", () => {

    let testuserCollection = {
      // add a valid user object
      userName: "kavya",
      userPassword: "evolvus123",
      role: {
        roleName: "Admin"
      },
      entity: {
        name: "entity"
      },
      contact: {

      },
      application: {
        applicationCode: "CDA"
      },
      tenantId: "IBL",
      createdBy: "SYSTEM",
      createdDate: new Date(),
      processingStatus: "AUTHORIZED",
      enabledFlag: 1,
      activationStatus: "ACTIVE"

    };
    beforeEach((done) => {
      user.deleteAll().then((res) => {
        user.save(testuserCollection).then((res) => {
          done();
        });
      });
    });

    it("should authenticate user", (done) => {
      let credentials = {
        userName: "kavya",
        userPassword: "evolvus123",
        enabledFlag: 1,
        processingStatus: "AUTHORIZED",
        applicationCode: "CDA"
      };
      var result = user.authenticate(credentials);
      expect(result).to.eventually.be.a('object');
      expect(result).to.eventually.not.have.property('userPassword');
      expect(result).to.eventually.not.have.property('saltString').notify(done);
    });

    it("should not authenticate user", (done) => {
      let credentials = {
        userName: "kavyak",
        userPassword: "evolvus123",
        enabledFlag: 1,
        processingStatus: "AUTHORIZED",
        applicationCode: "DOCK"
      };
      var result = user.authenticate(credentials);
      expect(result).to.be.rejectedWith("Invalid Credentials")
        .notify(done);
    });

    it("should  be rejected with Password Error", (done) => {
      let credentials = {
        userName: "kavya",
        userPassword: "evolvu123",
        enabledFlag: 1,
        processingStatus: "AUTHORIZED",
        applicationCode: "CDA"
      };
      var result = user.authenticate(credentials);
      expect(result).to.be.rejectedWith("Password Error")
        .notify(done);
    });
  });

  describe('testing update role', () => {

    let id;

    beforeEach((done) => {
      user.deleteAll().then((res) => {
        user.save(object1).then((res) => {
          id = res._id;

          done();

        });
      });
    });

    it('should update a token ', (done) => {
      var res = user.updateToken(id, "ABVDHGAFDHTAFV$#$SDWGFGHASVHAVBV%5657623");
      expect(res).to.eventually.be.a("object")
        .to.have.property("token")
        .to.eql("ABVDHGAFDHTAFV$#$SDWGFGHASVHAVBV%5657623")
        .notify(done);
    });
  });

});