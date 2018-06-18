const debug = require("debug")("evolvus-user.test.index");
const chai = require("chai");
const mongoose = require("mongoose");

var MONGO_DB_URL = process.env.MONGO_DB_URL || "mongodb://localhost/TestuserCollection";
/*
 ** chaiAsPromised is needed to test promises
 ** it adds the "eventually" property
 **
 ** chai and others do not support async / await
 */
const chaiAsPromised = require("chai-as-promised");

const expect = chai.expect;
chai.use(chaiAsPromised);

const user = require("../index");
const db = require("../db/user");

describe('user model validation', () => {
  let userObject = {
    // add a valid user Object here

  };

  let invalidObject={
    //add invalid user Object here

  };

  let undefinedObject; // object that is not defined
  let nullObject = null; // object that is null

  // before we start the tests, connect to the database
  before((done) => {
    mongoose.connect(MONGO_DB_URL);
    let connection = mongoose.connection;
    connection.once("open", () => {
        debug("ok got the connection");
        done();
    });
  });

  describe("validation against jsonschema",()=> {
    it("valid user should validate successfully", (done) => {
      try {
        var res = user.validate(userObject);
        expect(res)
          .to.eventually.equal(true)
          .notify(done);
        // if notify is not done the test will fail
        // with timeout
      } catch (e) {
        expect.fail(e, null, `valid user object should not throw exception: ${e}`);
      }
    });

    it("invalid user should return errors", (done) => {
      try {
        var res = user.validate(invalidObject);
        expect(res)
          .to.be.rejected
          .notify(done);
      } catch (e) {
        expect.fail(e, null, `exception: ${e}`);
      }
    });

    if("should error out for undefined objects", (done) => {
      try {
        var res = user.validate(undefinedObject);
        expect(res)
          .to.be.rejected
          .notify(done);
      } catch (e) {
        expect.fail(e, null, `exception: ${e}`);
      }
    });

    if("should error out for null objects", (done) => {
      try {
        var res = user.validate(nullObject);
        expect(res)
          .to.be.rejected
          .notify(done);
      } catch (e) {
        expect.fail(e, null, `exception: ${e}`);
      }
    });

  });

  describe("testing user.save method",()=> {

    beforeEach((done)=> {
      db.deleteAll().then((res)=> {
        done();
      });
    });

    it('should save a valid user object to database', (done) => {
      try {
        var result = user.save(userObject);
        //replace anyAttribute with one of the valid attribute of a user Object
        expect(result)
          .to.eventually.have.property("anyAttribute")
          .to.eql(userObject.anyAttribute)
          .notify(done);
      } catch (e) {
        expect.fail(e, null, `saving user object should not throw exception: ${e}`);
      }
    });

    it('should not save a invalid user object to database', (done) => {
      try {
        var result = user.save(invalidObject);
        expect(result)
          .to.be.rejected
          .notify(done);
      } catch (e) {
        expect.fail(e, null, `exception: ${e}`);
      }
    });

  });

  describe('testing user.getAll when there is data in database', () => {
    let object1={
      //add one valid user object here

    },object2={
      //add one more valid user object here

    };
    beforeEach((done) => {
      db.deleteAll().then((res) => {
        db.save(object1).then((res) => {
          db.save(object2).then((res) => {
            db.save(object1).then((res)=> {
              done();
            });
          });
        });
      });
    });

    it('should return limited records as specified by the limit parameter', (done) => {
      try {
        let res = user.getAll(2);
        expect(res)
          .to.be.fulfilled.then((docs) => {
            expect(docs)
              .to.be.a('array');
            expect(docs.length)
              .to.equal(2);
            done();
          });
      } catch (e) {
          expect.fail(e, null, `exception: ${e}`);
      }
    });

    it('should return all records if limit is -1', (done) => {
      try {
        let res = user.getAll(-1);
        expect(res)
          .to.be.fulfilled.then((docs) => {
            expect(docs)
              .to.be.a('array');
            expect(docs.length)
              .to.equal(3);
            done();
          });
      } catch (e) {
          expect.fail(e, null, `exception: ${e}`);
      }
    });

    it('should throw IllegalArgumentException for null value of limit', (done) => {
      try {
        let res = user.getAll(null);
        expect(res)
          .to.be.rejectedWith("IllegalArgumentException")
          .notify(done);
      } catch (e) {
          expect.fail(e, null, `exception: ${e}`);
      }
    });

    it('should throw IllegalArgumentException for undefined value of limit', (done) => {
      try {
        let undefinedLimit;
        let res = user.getAll(undefinedLimit);
        expect(res)
          .to.be.rejectedWith("IllegalArgumentException")
          .notify(done);
      } catch (e) {
          expect.fail(e, null, `exception: ${e}`);
      }
    });

  });

  describe('testing user.getAll when there is no data', () => {

    beforeEach((done) => {
      db.deleteAll().then((res) => {
        done();
      });
    });

    it('should return empty array when limit is -1', (done) => {
      try {
        let res = user.getAll(-1);
        expect(res)
          .to.be.fulfilled.then((docs) => {
            expect(docs)
              .to.be.a('array');
            expect(docs.length)
              .to.equal(0);
            expect(docs)
              .to.eql([]);
            done();
          });
      } catch (e) {
        expect.fail(e, null, `exception: ${e}`);
      }
    });

    it('should return empty array when limit is positive value ', (done) => {
      try {
        let res = user.getAll(2);
        expect(res)
          .to.be.fulfilled.then((docs) => {
            expect(docs)
              .to.be.a('array');
            expect(docs.length)
              .to.equal(0);
            expect(docs)
              .to.eql([]);
            done();
          });
      } catch (e) {
        expect.fail(e, null, `exception: ${e}`);
      }
    });
  });

  describe('testing getById', () => {
    // Insert one record , get its id
    // 1. Query by this id and it should return one user object
    // 2. Query by an arbitrary id and it should return {}
    // 3. Query with null id and it should throw IllegalArgumentException
    // 4. Query with undefined and it should throw IllegalArgumentException
    var id;
    beforeEach((done) => {
      db.save(userObject).then((res) => {
        id = res._id;
        done();
      });
    });

    it('should return one user matching parameter id', (done) => {
      try {
        var res = user.getById(id);
        expect(res).to.eventually.have.property('_id')
          .to.eql(id)
          .notify(done);
      } catch (e) {
        expect.fail(e, null, `exception: ${e}`);
      }
    });

    it('should return empty object i.e. {} as no user is identified by this Id ', (done) => {
      try {
        let badId = new mongoose.mongo.ObjectId();
        var res = user.getById(badId);
        expect(res).to.eventually.to.eql({})
          .notify(done);
      } catch (e) {
        expect.fail(e, null, `exception: ${e}`);
      }
    });

    it("should throw IllegalArgumentException for undefined Id parameter ", (done) => {
      try {
        let undefinedId;
        let res = user.getById(undefinedId);
        expect(res)
          .to.eventually.to.be.rejectedWith("IllegalArgumentException")
          .notify(done);
      } catch (e) {
        expect.fail(e, null, `exception: ${e}`);
      }
    });

    it("should throw IllegalArgumentException for null Id parameter ", (done) => {
      try {
        let res = user.getById(null);
        expect(res)
          .to.eventually.to.be.rejectedWith("IllegalArgumentException")
          .notify(done);
      } catch (e) {
        expect.fail(e, null, `exception: ${e}`);
      }
    });

    it("should be rejected for arbitrary object as Id parameter ", (done) => {
      // an id is a 12 byte string, -1 is an invalid id value
      let id = userObject;
      let res = user.getById(id);
      expect(res)
        .to.eventually.to.be.rejectedWith("must be a single String of 12 bytes")
        .notify(done);
    });

  });

  describe("testing user.getOne",()=> {
    let object1={
      //add one valid user object here

    },object2={
      //add one more valid user object here

    };
    beforeEach((done) => {
      db.deleteAll().then((res) => {
        db.save(object1).then((res) => {
          db.save(object2).then((res) => {
              done();
          });
        });
      });
    });

    it("should return one user record identified by attribute",(done)=> {
      try {
        // take one attribute from object1 or object2 and its value
        let res = user.getOne(attribute of object1/object2,its value);
        expect(res)
          .to.eventually.be.a("object")
          .to.have.property('attribute of object1/object2')
          .to.eql('attribute value')
          .notify(done);
      } catch (e) {
        expect.fail(e, null, `exception: ${e}`);
      }
    });

    it('should return empty object i.e. {} as no user is identified by this attribute', (done) => {
      try {
        // replace validAttribute and add a bad value to it
        var res = user.getOne(validAttribute,badValue);
        expect(res).to.eventually.to.eql({})
          .notify(done);
      } catch (e) {
        expect.fail(e, null, `exception: ${e}`);
      }
    });

    it("should throw IllegalArgumentException for undefined Attribute parameter ", (done) => {
      try {
        //replace validvalue with a valid value for an attribute
        let undefinedAttribute;
        let res = user.getOne(undefinedAttribute,validValue);
        expect(res)
          .to.eventually.to.be.rejectedWith("IllegalArgumentException")
          .notify(done);
      } catch (e) {
        expect.fail(e, null, `exception: ${e}`);
      }
    });

    it("should throw IllegalArgumentException for undefined Attribute parameter ", (done) => {
      try {
        // replace validAttribute with a valid attribute name
        let undefinedValue;
        let res = user.getOne(validAttribute,undefinedValue);
        expect(res)
          .to.eventually.to.be.rejectedWith("IllegalArgumentException")
          .notify(done);
      } catch (e) {
        expect.fail(e, null, `exception: ${e}`);
      }
    });

    it("should throw IllegalArgumentException for null attribute parameter ", (done) => {
      try {
        //replace validValue with a valid value for an attribute
        let res = user.getOne(null,validValue);
        expect(res)
          .to.eventually.to.be.rejectedWith("IllegalArgumentException")
          .notify(done);
      } catch (e) {
        expect.fail(e, null, `exception: ${e}`);
      }
    });

    it("should throw IllegalArgumentException for null value parameter ", (done) => {
      try {
        //replace attributeValue with a valid attribute name
        let res = user.getOne(attributeValue,null);
        expect(res)
          .to.eventually.to.be.rejectedWith("IllegalArgumentException")
          .notify(done);
      } catch (e) {
        expect.fail(e, null, `exception: ${e}`);
      }
    });
  });


  describe("testing user.getMany",()=> {
      let object1={
        //add one valid user object here

      },object2={
        //add one more valid user object here

      };
      beforeEach((done) => {
        db.deleteAll().then((res) => {
          db.save(object1).then((res) => {
            db.save(object2).then((res) => {
                done();
            });
          });
        });
      });

      it("should return array of user records identified by attribute",(done)=> {
        try {
          // take one attribute from object1 or object2 and its value
          let res = user.getMany(attribute of object1/object2,its value);
          expect(res).to.eventually.be.a("array");
          //enter proper length according to input value
          expect(res).to.eventually.have.length(1);
          done();
        } catch (e) {
          expect.fail(e, null, `exception: ${e}`);
        }
      });

      it('should return empty array i.e. [] as no user is identified by this attribute', (done) => {
        try {
          // replace validAttribute and add a bad value to it
          var res = user.getMany(validAttribute,badValue);
          expect(res).to.eventually.to.eql([])
            .notify(done);
        } catch (e) {
          expect.fail(e, null, `exception: ${e}`);
        }
      });

      it("should throw IllegalArgumentException for undefined Attribute parameter ", (done) => {
        try {
          //replace validvalue with a valid value for an attribute
          let undefinedAttribute;
          let res = user.getMany(undefinedAttribute,validValue);
          expect(res)
            .to.eventually.to.be.rejectedWith("IllegalArgumentException")
            .notify(done);
        } catch (e) {
          expect.fail(e, null, `exception: ${e}`);
        }
      });

      it("should throw IllegalArgumentException for undefined Attribute parameter ", (done) => {
        try {
          // replace validAttribute with a valid attribute name
          let undefinedValue;
          let res = user.getMany(validAttribute,undefinedValue);
          expect(res)
            .to.eventually.to.be.rejectedWith("IllegalArgumentException")
            .notify(done);
        } catch (e) {
          expect.fail(e, null, `exception: ${e}`);
        }
      });

      it("should throw IllegalArgumentException for null attribute parameter ", (done) => {
        try {
          //replace validValue with a valid value for an attribute
          let res = user.getMany(null,validValue);
          expect(res)
            .to.eventually.to.be.rejectedWith("IllegalArgumentException")
            .notify(done);
        } catch (e) {
          expect.fail(e, null, `exception: ${e}`);
        }
      });

      it("should throw IllegalArgumentException for null value parameter ", (done) => {
        try {
          //replace attributeValue with a valid attribute name
          let res = user.getMany(attributeValue,null);
          expect(res)
            .to.eventually.to.be.rejectedWith("IllegalArgumentException")
            .notify(done);
        } catch (e) {
          expect.fail(e, null, `exception: ${e}`);
        }
      });
    });
});
