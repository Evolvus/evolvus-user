const debug = require("debug")("evolvus-user:index");
const userSchema = require("./model/userSchema")
  .schema;
const userCollection = require("./db/user");
const validate = require("jsonschema")
  .validate;
const docketClient=require("evolvus-docket-client");

var docketObject={
  // required fields
  application:"PLATFORM",
  source:"user",
  name:"",
  createdBy:"",
  ipAddress:"",
  status:"SUCCESS", //by default
  eventDateTime:Date.now(),
  keyDataAsJSON:"",
  details:"",
  //non required fields
  level:""
};

module.exports.validate = (userObject) => {
  return new Promise((resolve, reject) => {
    try {
      if(typeof userObject==="undefined" ) {
        throw new Error("IllegalArgumentException:userObject is undefined");
      }
      var res = validate(userObject, userSchema);
      debug("validation status: ", JSON.stringify(res));
      if(res.valid) {
        resolve(res.valid);
      } else {
        reject(res.errors);
      }
    } catch (err) {
      reject(err);
    }
  });
};

// All validations must be performed before we save the object here
// Once the db layer is called its is assumed the object is valid.
module.exports.save = (userObject) => {
  return new Promise((resolve, reject) => {
    try {
      if(typeof userObject === 'undefined' || userObject == null) {
         throw new Error("IllegalArgumentException: userObject is null or undefined");
      }
      docketObject.name="user_save";
      docketObject.keyDataAsJSON=JSON.stringify(userObject);
      docketObject.details=`user creation initiated`;
      docketClient.postToDocket(docketObject);
      var res = validate(userObject, userSchema);
      debug("validation status: ", JSON.stringify(res));
      if(!res.valid) {
        reject(res.errors);
      }

      // Other validations here


      // if the object is valid, save the object to the database
      userCollection.save(userObject).then((result) => {
        debug(`saved successfully ${result}`);
        resolve(result);
      }).catch((e) => {
        debug(`failed to save with an error: ${e}`);
        reject(e);
      });
    } catch (e) {
      docketObject.name="user_ExceptionOnSave";
      docketObject.keyDataAsJSON=JSON.stringify(userObject);
      docketObject.details=`caught Exception on user_save ${e.message}`;
      docketClient.postToDocket(docketObject);
      debug(`caught exception ${e}`);
      reject(e);
    }
  });
};

// List all the objects in the database
// makes sense to return on a limited number
// (what if there are 1000000 records in the collection)
module.exports.getAll = (limit) => {
  return new Promise((resolve, reject) => {
    try {
      if (typeof(limit) == "undefined" || limit == null) {
        throw new Error("IllegalArgumentException: limit is null or undefined");
      }
      docketObject.name="user_getAll";
      docketObject.keyDataAsJSON=`getAll with limit ${limit}`;
      docketObject.details=`user getAll method`;
      docketClient.postToDocket(docketObject);

      userCollection.findAll(limit).then((docs) => {
        debug(`user(s) stored in the database are ${docs}`);
        resolve(docs);
      }).catch((e) => {
        debug(`failed to find all the user(s) ${e}`);
        reject(e);
      });
    } catch (e) {
      docketObject.name="user_ExceptionOngetAll";
      docketObject.keyDataAsJSON="userObject";
      docketObject.details=`caught Exception on user_getAll ${e.message}`;
      docketClient.postToDocket(docketObject);
      debug(`caught exception ${e}`);
      reject(e);
    }
  });
};


// Get the entity idenfied by the id parameter
module.exports.getById = (id) => {
  return new Promise((resolve, reject) => {
    try {

      if (typeof(id) == "undefined" || id == null) {
        throw new Error("IllegalArgumentException: id is null or undefined");
      }
      docketObject.name="user_getById";
      docketObject.keyDataAsJSON=`userObject id is ${id}`;
      docketObject.details=`user getById initiated`;
      docketClient.postToDocket(docketObject);

      userCollection.findById(id)
        .then((res) => {
          if (res) {
            debug(`user found by id ${id} is ${res}`);
            resolve(res);
          } else {
            // return empty object in place of null
            debug(`no user found by this id ${id}`);
            resolve({});
          }
        }).catch((e) => {
          debug(`failed to find user ${e}`);
          reject(e);
        });

    } catch (e) {
      docketObject.name="user_ExceptionOngetById";
      docketObject.keyDataAsJSON=`userObject id is ${id}`;
      docketObject.details=`caught Exception on user_getById ${e.message}`;
      docketClient.postToDocket(docketObject);
      debug(`caught exception ${e}`);
      reject(e);
    }
  });
};

module.exports.getOne=(attribute,value)=> {
  return new Promise((resolve,reject)=> {
    try {
      if (attribute == null || value == null || typeof attribute === 'undefined' || typeof value === 'undefined') {
        throw new Error("IllegalArgumentException: attribute/value is null or undefined");
      }

      docketObject.name="user_getOne";
      docketObject.keyDataAsJSON=`userObject ${attribute} with value ${value}`;
      docketObject.details=`user getOne initiated`;
      docketClient.postToDocket(docketObject);
      userCollection.findOne(attribute,value).then((data)=> {
        if (data) {
          debug(`user found ${data}`);
          resolve(data);
        } else {
          // return empty object in place of null
          debug(`no user found by this ${attribute} ${value}`);
          resolve({});
        }
      }).catch((e)=> {
        debug(`failed to find ${e}`);
      });
    } catch (e) {
      docketObject.name="user_ExceptionOngetOne";
      docketObject.keyDataAsJSON=`userObject ${attribute} with value ${value}`;
      docketObject.details=`caught Exception on user_getOne ${e.message}`;
      docketClient.postToDocket(docketObject);
      debug(`caught exception ${e}`);
      reject(e);
    }
  });
};

module.exports.getMany=(attribute,value)=> {
  return new Promise((resolve,reject)=> {
    try {
      if (attribute == null || value == null || typeof attribute === 'undefined' || typeof value === 'undefined') {
        throw new Error("IllegalArgumentException: attribute/value is null or undefined");
      }

      docketObject.name="user_getMany";
      docketObject.keyDataAsJSON=`userObject ${attribute} with value ${value}`;
      docketObject.details=`user getMany initiated`;
      docketClient.postToDocket(docketObject);
      userCollection.findMany(attribute,value).then((data)=> {
        if (data) {
          debug(`user found ${data}`);
          resolve(data);
        } else {
          // return empty object in place of null
          debug(`no user found by this ${attribute} ${value}`);
          resolve([]);
        }
      }).catch((e)=> {
        debug(`failed to find ${e}`);
      });
    } catch (e) {
      docketObject.name="user_ExceptionOngetMany";
      docketObject.keyDataAsJSON=`userObject ${attribute} with value ${value}`;
      docketObject.details=`caught Exception on user_getMany ${e.message}`;
      docketClient.postToDocket(docketObject);
      debug(`caught exception ${e}`);
      reject(e);
    }
  });
};
