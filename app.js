var fs = require('fs'),
  http = require('http'),
  express = require('express'),
  config = require('./server/config'),
  routes = require('./server/routes'),
  packageJson = require('./package.json');


config.load('server/config/defaults.json');
var app = express();

app.use(require('connect-assets')({ src: __dirname + '/client/assets'}));
app.set('views', __dirname + '/server/views');
app.set('view engine', 'jade');

//Only serve images - the less + coffee will be served by connect-assets
app.use('/images', express.static(__dirname + '/client/assets/img'));
//Bootstrap gets a special mapping
app.use('/components', express.static(__dirname + '/client/assets/js/bower_components'));
app.use(express.bodyParser());

routes.init(app, packageJson);

var port = process.env.PORT || 5000;
app.set('port', port);
http.createServer(app).listen(app.get('port'), function () {
  console.log("Express server listening on port " + port);
});