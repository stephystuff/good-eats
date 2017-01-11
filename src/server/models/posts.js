(function() {
  'use strict';

  var dbConnect = require('./db-connect');
  var ObjectId = require('mongodb').ObjectId;

  module.exports = {
    getPosts,
    getPost,
    createPost,
    deletePost
    // updatePost
  };

  function getPosts(done) {
    dbConnect(function connectHandler(err,db) {
      if (err) {
        done(err, null);
        return;
      }
      db.collection('posts')
        .find()
        .toArray(done);
    });
  }

  function createPost(data, done) {
    dbConnect(function connectHandler(err, db) {
      if (err) {
        done(err, null);
        return;
      }
      data.createTime = Date.now();
      db.collection('posts')
        .insert(data, done);
    });
  }

  function getPost(_id, done){
    dbConnect(function connectHandler(err, db) {
      if (err) {
        done(err, null);
        return;
      }
      db.collection('posts')
        .findOne({_id: new ObjectId(_id)}, function(err, data) {
          var newData = {
            'id': data._id,
            'dishName': data.dishName,
            'restaurant': data.restaurant,
            'cuisineType': data.cuisineType,
            'photo': data.photo,
            'comment': data.comment,
            'createTime': data.createTime
          };
          done(null, newData);
        });
    });
  }

  function deletePost(_id, done) {
    dbConnect(function connectHandler(err, db) {
      if (err) {
        done(err, null);
        return;
      }
      db.collection('posts')
          .findOne({_id: ObjectId(_id)}, function(err, data) {
          var newData = {
              'id': data._id,
              'dishName': data.dishName,
              'restaurant': data.restaurant,
              'cuisineType': data.cuisineType,
              'photo': data.photo,
              'comment': data.comment,
              'createTime': data.createTime
            };
          });
      db.collection('posts')
          .findOneAndDelete({_id: ObjectId(_id)})
          .then(function successHandler(finish){
              done(err, newData);
            }, function errorHandler(value){
              done(value, null);
            });
    });
  }
}());
