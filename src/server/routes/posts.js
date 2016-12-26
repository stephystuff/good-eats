(function() {
  'use strict';

  var express = require('express');
  var postsModel = require('../models/posts');

  var router = express.Router();

  router.get('/', function allPosts(req, res) {
    postsModel.getPosts(function dataRetrieved(err, data) {
      if (err) {
        console.error(err);
        res.status(500).send('Uh oh...couldn\t get your data\n' + err );
        return;
      }
      res.json(data);
    });
  });

  router.post('/', function createPost(req, res) {
    console.log(req.body);

    postsModel.createPost(req.body, function dataCreated(err, data) {
      if (err) {
        console.error(err);
        (500).send('Oh no...couldn\t post your data');
        return;
      }
      res.json(data);
    });
  });

  module.exports = router;
}());
