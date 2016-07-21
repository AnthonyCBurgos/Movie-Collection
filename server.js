var express = require('express'),
  jade = require('jade'),
  http = require('http'),
  mongoose = require('mongoose'),
  config = require('./config/config'),
  movieController = require('./controller/movieCollectionController');

var app = express();
var port = process.env.PORT || 8080;

app.set('view engine', 'jade');
mongoose.connect(config.getConnection());
movieController(app);

app.use("/", express.static(__dirname + "/assets/"));
app.use("/app/", express.static(__dirname + "/app/"));
app.get('/', function(req, res) {
	res.render("index");
});

var server = http.createServer(app).listen(port, function() {
  console.log('Express server listening on port ' + port);
});

var io = require('socket.io').listen(server);