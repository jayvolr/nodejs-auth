// MongoDB configuration
const MongoClient = require('mongodb').MongoClient;
const secrets = require('./secrets');

MongoClient.connect(`mongodb://jayvolr:${secrets.mongodb_password}@blog-test-shard-00-00-hrtuw.mongodb.net:27017,blog-test-shard-00-01-hrtuw.mongodb.net:27017,blog-test-shard-00-02-hrtuw.mongodb.net:27017/blog-test?ssl=true&replicaSet=blog-test-shard-0&authSource=admin`, (err, connection) => {
  if (err) {console.warn('error from db.js'); console.log(err)}
  else {
    module.exports.db = connection;
    console.log('Connected to mongodb successfully.');
  }
})
