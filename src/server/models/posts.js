var dbConnect = require('./db-connect');

module.exports = {
  getPosts,
  getPost,
  createPost,
  deletePost,
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

function getPost(data, done){
  dbConnect(function connectHandler(err, db) {
    if (err) {
      done(err, null);
      return;
    }
    var post = db.collection('posts')
      .findOne({_id: ObjectId(data)}, function(err, data) {
        newData = {
          'id': data._id,
          'dishName': data.dishName,
          'restaurant': data.restaurant,
          'cuisineType': data.cuisineType,
          'photo': data.photo,
          'comment': data.comment,
          'createTime': data.createTime
        };
        done(null, data);
      });
  });
}

function deletePost(data, done) {
  console.log(data);
  dbConnect(function connectHandler(err, db) {
    if (err) {
      done(err, null);
      return;
    }
    db.collection('posts')
        .findOne({_id: ObjectId(data)}, function(err, data) {
          var newData = {
            'id': data._id,
            'dishName': data.dishName,
            'restaurant': data.restaurant,
            'cuisineType': data.cuisineType,
            'photo': data.photo,
            'comment': data.comment
          };
        });
    db.collection('posts')
        .findOneAndDelete({_id: ObjectId(data)})
          .then(function successHandler(finish){
            done(err, newData);
          }, function errorHandler(value){
            done(value, null);
          });
  });
}
