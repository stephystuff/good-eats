(function() {
  'use strict';

  var mongodb = require('mongodb');
  var uri = process.env.MONGODB_URL || 'mongodb://localhost:27017/good-eats';

  module.exports = function connect(done) {
    mongodb.MongoClient.connect(uri, done);
  };
}());
