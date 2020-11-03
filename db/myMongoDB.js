const MongoClient = require("mongodb").MongoClient;

let DB;

const mongoDb = (uri, dbName) => {
  const mongo = {};

  mongo.client = new MongoClient(uri, { useUnifiedTopology: true });

  // return the promise of the db connection
  return new Promise((resolve) => {
    mongo.client.connect((err) => {
      if (err) throw err;
      mongo.connection = mongo.client.db(dbName);

      console.log("Yay, connected to Mongo!");
      resolve(mongo);
    });
  });
};

const initialize = () => {
  return new Promise((resolve) => {
    const uri = process.env.MONGO_URL || "mongodb://localhost:27017";
    mongoDb(uri, "db").then((db) => {
      DB = db;
      resolve();
    });
  });
};

const getDb = () => {
  return DB;
};

// Export the init and the db connection
module.exports = { initialize, getDb };
