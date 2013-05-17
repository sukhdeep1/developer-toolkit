var fs = require('fs'),
  http = require('http'),
  launcher = require('./app/launcher'),
  express = require('express'),
  tokenGenerator = require('./app/tokenGenerator');

var app = express();

app.use(require('connect-assets')());
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express.static(__dirname + '/public'));
app.use(express.bodyParser());

app.get('/', function(req, res) {
  res.redirect('/player');
});

app.get('/player', function(req, res) {
  res.render('player-form');
});

app.get('/profile', function(req, res) {
  res.render('profile-form');
});

app.get('/hello', function(req, res) {
  res.send('hello');
});
app.get('/testpage', function(req, res) {
  res.render('testpage');
});

app.get('/make-token', function(req,res){
 res.render('make-token')
});

app.post('/make-token', function(req, res){
  tokenGenerator.makeToken( req.body.corespringUrl, req.body.clientId, req.body.clientSecret, function(err,data){
    var result = {accessToken : data};
    console.log( result );
    res.render('token-result', result );
  })
});

app.post('/launch-player',
launcher.encryptOptions,
launcher.buildPlayerOptions,
launcher.launchPlayer);

app.post('/launch-profile',
launcher.encryptOptions,
launcher.buildPlayerOptions,
launcher.launchProfile);

// start server
var port = process.env.PORT || 5000;
http.createServer(app).listen(port, function() {
  console.log("Express server listening on port " + port);
});