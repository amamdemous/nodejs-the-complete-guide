const { MongoClient } = require("mongodb");
const { config } = require("../config");

const uri = `mongodb+srv://telman:${config.DATABASE_PASSWORD}@cluster0.gm6pmjz.mongodb.net/shop?retryWrites=true&w=majority`;
let _db;

const mongoConnect = (callback) => {
  MongoClient.connect(uri)
    .then((client) => {
      console.log("Connected");
      _db = client.db();
      callback();
    })
    .catch((err) => {
      console.log(err);
      throw err;
    });
};

const getDb = () => {
  if (_db) {
    return _db;
  }

  throw "No database found!";
};

module.exports = { getDb, mongoConnect };
