const debug = require("debug")("evolvus-user:db:user");
const mongoose = require("mongoose");
const ObjectId = require('mongodb')
  .ObjectID;

const userSchema = require("./userSchema");
const bcrypt = require('bcryptjs');

// Creates a userCollection collection in the database
var userCollection = mongoose.model("userCollection", userSchema);

// Saves the userCollection object to the database and returns a Promise
// The assumption here is that the Object is valid
module.exports.save = (object) => {
  return new Promise((resolve, reject) => {
    try {
      // any exception during construction will go to catch
      bcrypt.genSalt(10, function(err, salt) {
        bcrypt.hash(object.userPassword, salt, function(err, hash) {
          // Assign hashedPassword to your userPassword and salt to saltString ,store it in DB.
          object.userPassword = hash;
          object.saltString = salt;
          let user = new userCollection(object);

          // on resolve we need to resolve this method
          // on reject or exception we reject it,
          // this is because the record either saves or it doesnt
          // in any case it does not save, is a reject
          user.save()
            .then((data) => {

              data = data.toObject();
              delete data.userPassword;
              delete data.saltString;
              debug("saved successfully", data);
              resolve(data);
            }, (err) => {
              debug(`rejected save.. ${err}`);
              reject(err);
            })
            .catch((e) => {
              debug(`exception on save: ${e}`);
              reject(e);
            });
        });
      });

    } catch (e) {
      debug(`caught exception: ${e}`);
      reject(e);
    }
  });
};


// Returns a limited set if all the user(s) with a Promise
// if the collectiom has no records it Returns
// a promise with a result of  empty object i.e. {}
module.exports.findAll = (limit) => {
  if (limit < 1) {
    return userCollection.find({});
  }
  return userCollection.find({}).limit(limit);
};

// Finds the user which matches the value parameter from user collection
// If there is no object matching the attribute/value, return empty object i.e. {}
// null, undefined should be rejected with Invalid Argument Error
// Should return a Promise
module.exports.findOne = (attribute, value) => {
  return new Promise((resolve, reject) => {
    try {
      var query = {};
      query[attribute] = value;
      userCollection.findOne(query)
        .then((data) => {
          debug(`user found ${data}`);
          resolve(data);
        }, (err) => {
          debug(`rejected find.. ${err}`);
          reject(err);
        })
        .catch((e) => {
          debug(`exception on find: ${e}`);
          reject(e);
        });
    } catch (e) {
      debug(`caught exception: ${e}`);
      reject(e);
    }
  });
};

// Finds all the users which matches the value parameter from user collection
// If there is no object matching the attribute/value, return empty object i.e. {}
// null, undefined should be rejected with Invalid Argument Error
// Should return a Promise
module.exports.findMany = (attribute, value) => {
  return new Promise((resolve, reject) => {
    try {
      var query = {};
      query[attribute] = value;
      userCollection.find(query)
        .then((data) => {
          debug(`user found ${data}`);
          resolve(data);
        }, (err) => {
          debug(`rejected find.. ${err}`);
          reject(err);
        })
        .catch((e) => {
          debug(`exception on find: ${e}`);
          reject(e);
        });
    } catch (e) {
      debug(`caught exception: ${e}`);
      reject(e);
    }
  });
};

// Finds the user for the id parameter from the user collection
// If there is no object matching the id, return empty object i.e. {}
// null, undefined, invalid objects should be rejected with Invalid Argument Error
// All returns are wrapped in a Promise
//
module.exports.findById = (id) => {
  return new Promise((resolve, reject) => {
    try {
      userCollection.findById({
          _id: new ObjectId(id)
        })
        .then((res) => {
          debug("findById successfull: ", res);
          resolve(res);
        }, (err) => {
          debug(`rejected finding userCollection.. ${err}`);
          reject(err);
        })
        .catch((e) => {
          debug(`exception on finding user: ${e}`);
          reject(e);
        });
    } catch (e) {
      debug(`caught exception: ${e}`);
      reject(e);
    }
  });
};


//Authenticate User credentials {userName,userPassword,application}
module.exports.authenticate = (credentials) => {
  return new Promise((resolve, reject) => {
    try {
      let query = {
        "userName": credentials.userName,
        "enabledFlag": credentials.enabledFlag,
        "application.applicationCode": credentials.applicationCode,
        "processingStatus": "AUTHORIZED"
      };

      userCollection.findOne(query)
        .then((userObj) => {


          if (userObj) {


            bcrypt.hash(credentials.userPassword, userObj.saltString, (err, hash) => {


              // bcrypt.compare(userObj.userPassword,hash, (err, res) => {
              if (hash === userObj.userPassword) {

                userObj = userObj.toObject();
                delete userObj.saltString;
                delete userObj.userPassword;
                debug("authentication successful: ", userObj);
                resolve(userObj);
              } else {

                debug(`Authenttcation failed.Password Error`);
                reject("Authenttcation failed.Password Error");
              }
              // });
            });
          } else {
            debug(`Invalid Credentials.`);
            reject("Invalid Credentials");
          }
        }, (err) => {

          debug(`Invalid Credentials. ${err}`);
          reject(err);
        })
        .catch((e) => {

          debug(`exception on authenticating user: ${e}`);
          reject(e);
        });
    } catch (e) {

      debug(`caught exception: ${e}`);
      reject(e);
    }
  });
};

module.exports.updateToken = (id, token) => {
  return new Promise((resolve, reject) => {
    try {
      userCollection.findById({
        _id: new ObjectId(id)
      }).then((user) => {
        if (user) {
          user.set({
            token: token
          });
          user.save().then((res) => {
            res = res.toObject();
            delete res.userPassword;
            delete res.saltString;
            // delete res.token;
            debug(`Token updated successfully ${res}`);
            resolve(res);
          }).catch((e) => {
            debug(`failed to update ${e}`);
            reject(e);
          });
        } else {
          debug(`user not found with id, ${id}`);
          reject(`There is no such user with id:${id}`);
        }
      }).catch((e) => {
        debug(`exception on update ${e}`);
        reject(e.message);
      });
    } catch (e) {
      debug(`caught exception ${e}`);
      reject(e.message);
    }
  });
};

// Deletes all the entries of the collection.
// To be used by test only
module.exports.deleteAll = () => {
  return userCollection.remove({});
};