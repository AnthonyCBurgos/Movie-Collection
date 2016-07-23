var express = require('express'),
  http = require('http'),
  mongoose = require('mongoose'),
  config = require('./config/config'),
  movieController = require('./controller/movieCollectionController');

var app = express();
var port = process.env.PORT || 8080;

app.use('/', function(req, res, next) {
	res.setHeader("Access-Control-Allow-Origin", "*");
	res.setHeader("Access-Control-Allow-Credentials", "true");
    res.setHeader("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
    res.setHeader("Access-Control-Allow-Headers", "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers");
	next();
});

mongoose.connect(config.getConnection());
movieController(app);

var server = http.createServer(app).listen(port, function() {
  console.log('Express server listening on port ' + port);
});

var io = require('socket.io').listen(server);