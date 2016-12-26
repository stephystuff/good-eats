(function() {
  'use strict';

  var express = require('express');
  var bodyParse = require('body-parser');
  var server = express();

  server.set('port', process.env.PORT || 3000);

  server.use(bodyParse.json());

  server.use(express.static('build/'));

  server.use("/posts", require('./routes/posts'));

  server.listen(server.get('port'), function serverStart(err) {
    if (err) {
      console.error(err, 'ERROR');
    } else {
      console.log('Server located at: http://localhost:' + server.get('port'));
    }
  });
}());
