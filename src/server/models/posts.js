var dbConnect = require('./db-connect');

module.exports = {
  getPosts,
  // getPost,
  createPost
  // deletePost,
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
