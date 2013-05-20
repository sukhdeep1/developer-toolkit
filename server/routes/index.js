var config = require('../config');

var Routes = function(){

  this.init = function(app){

    app.get('/', function(req, res) {
      res.render('index', {title: "Index", corespringUrl : config.get("CORESPRING_URL")});
    });


    app.get('/testpage', function(req,res){
      res.render('testpage', {title: "Index", corespringUrl : config.get("CORESPRING_URL")});
    });


    app.get('/partials/:name', function(req,res){
      res.render('partials/' + req.params.name);
    })
  }
};

module.exports = new Routes();

