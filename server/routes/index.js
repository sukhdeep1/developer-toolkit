require('coffee-script');

var config = require('../config'),
  launchTemplate = require('./templates/launch');

/** Single line js friendly string */
exports.jsString = function(htmlString){
  return htmlString
          .replace(/"/g, "\\\"")
          .replace(/\n/g, "\\n")
          .replace(/\//g, "\\/")
}

exports.init = function(app){
  app.get('/', function(req, res) {
    var params = {
      jsString : exports.jsString,
      title: "Index",
      corespringUrl : config.get("CORESPRING_URL"),
      launchTemplate: launchTemplate.template()
    }
    res.render('index', params );
  });

  app.get('/partials/:name', function(req,res){
    res.render('partials/' + req.params.name);
  });

  app.get('/run-launcher', function(req, res){
    var template = launchTemplate.template(
      config.get("CORESPRING_URL"),
      req.query.clientId,
      req.query.encrypted,
      req.query.overrides,
      "ignore");

    res.setHeader('Content-Type', 'text/html');
    res.send(template)
  });
};

