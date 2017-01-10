(function() {
  'use strict';


  var express = require('express');
  var postsModel = require('../models/posts');
  var router = express.Router();
  var OAuth = require('oauth');
  var oauth = new OAuth.OAuth(
    null,
    null,
    'UNXaKdjrKgqtK_m0e81Izw',
    'AOHSIzQ7vi0XPHgwB7XTjaB4__g',
    '1.0',
    null,
    'HMAC-SHA1'
  );

  router.get('/', function getPosts(req, res) {
    postsModel.getPosts(function retrieveData(err, data) {
      res.json(data);
    });
  });

  router.get('/search', function getRestaurantDetails(req, res) {
    console.log('in search');
    oauth.get('https://api.yelp.com/v2/search?term=restaurants&location=20720', 'PtBYsX0jEl7D__I_6GVlVBWeMSpua1Rf', 'KBYnp6imgxsHAyU3kmyOnj3W0bw', function(e, data){
      if (e) console.error(e);
      console.log(require('util').inspect(data));
      res.json(data);
    });
  });

  router.get('/:id([a-f0-9]{24})', function getPost(req, res) {
    postsModel.getPost(req.params.id, function createSingleData(err, data) {
      if (err) {
        console.error(err);
        res.status(500).send('couldn\'t get your data');
        return;
      }
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
        'id': data.ops[0]._id,
        'dishName': data.ops[0].dishName,
        'restaurant': data.ops[0].restaurant,
        'cuisineType': data.ops[0].cuisineType,
        'photo': data.ops[0].photo,
        'comment': data.ops[0].comment
      });
    });
  });

  router.delete('/:id([a-f0-9] {24})', function deletePost(req, res){
    postsModel.deletePost(req.params.id, function createDeleteData(err, data){
        if (err) {
          console.error(err);
          res.status(500).send('couldn\'t get your data');
          return;
        }
        res.json(data);
    });
  });

  module.exports = router;

}());
