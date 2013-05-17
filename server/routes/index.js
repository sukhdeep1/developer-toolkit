
var Routes = function(){

  this.init = function(app){

    app.get('/', function(req, res) {
      res.render('index', {title: "Index"});
    });

    app.get('/partials/:name', function(req,res){
      res.render('partials/' + req.params.name);
    })
  }
};

module.exports = new Routes();

