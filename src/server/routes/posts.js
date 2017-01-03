(function() {
  'use strict';

  var express = require('express');
  var postsModel = require('../models/posts');

  var router = express.Router();

  router.get('/', function allPosts(req, res) {
    postsModel.getPosts(function retrieveData(err, data) {
      res.json(data);
    });
  });

  router.post('/', function createPost(req, res) {
    console.log('log 1',req.body);

    postsModel.createPost(req.body, function createdData(err, data) {
      if (err) {
        console.error(err);
        res.status(500).send('couldn\t get your data');
        return;
      }
      res.json({
        'dishName': data.ops[0].dishName,
        'restaurant': data.ops[0].restaurant,
        'cuisineType': data.ops[0].cuisineType,
        'photo': data.ops[0].photo,
        'comment': data.ops[0].comment
      });
    });
  });

  module.exports = router;
}());
