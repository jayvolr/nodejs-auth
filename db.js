// MongoDB configuration
const MongoClient = require('mongodb').MongoClient;
const secrets = require('./secrets');

MongoClient.connect(`mongodb://jayvolr:${secrets.mongodb_password}@development-shard-00-00-hrtuw.mongodb.net:27017,development-shard-00-01-hrtuw.mongodb.net:27017,development-shard-00-02-hrtuw.mongodb.net:27017/development?ssl=true&replicaSet=development-shard-0&authSource=admin`, (err, connection) => {
  if (err) {console.warn('error from db.js'); console.log(err)}
  else {
    module.exports.db = connection;
    console.log('Connected to mongodb successfully.');
  }
});
