var fs = require('fs'),
  http = require('http'),
  express = require('express');

var app = express();

app.use(require('connect-assets')({ src: __dirname + '/client/assets'}));
app.set('views', __dirname + '/server/views');
app.set('view engine', 'jade');
app.use(express.static(__dirname + '/client/public'));
app.use('/img', express.static(__dirname + '/client/assets/img'));
app.use(express.bodyParser());

app.get('/', function(req, res) {
  res.render('index', {title: "Index"});
});


// start server
var port = process.env.PORT || 5000;
app.set('port', port);//process.env.PORT || 3000);
http.createServer(app).listen(app.get('port'), function() {
  console.log("Express server listening on port " + port);
});