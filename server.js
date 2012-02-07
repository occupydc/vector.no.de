
/**
 * Module dependencies.
 */

var express = require('express');

var app = module.exports = express.createServer();

// Configuration

app.configure(function(){
  app.use(express.logger());
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(__dirname + '/public'));
});

app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

app.configure('production', function(){
  app.use(express.errorHandler());
});

// Routes

app.get('/', function(req, res) {
  res.render('index', {locals: {
  	title: 'vector.no.de' 
  }});
});

/***
 * Occupations 
 */

// module export
var occupations = require('./occupations'); 

// index
app.get('/occupations', function(req, res) {
  res.render('occupations/index', {locals: {
  	occupations: occupations.all,
  	title: 'vector.no.de'
  }});
});

// individual
app.get('/occupations/:id', function(req, res) {
  var occupation = occupations.find(req.params.id);
  res.render('occupations/individual',{locals: {
    occupation: occupation,
    title: 'vector.no.de'
  }});
});

// edit
app.get('/occupations/:id/edit', function(req, res) {
  var occupation = occupations.find(req.params.id);
  res.render('occupations/edit',{locals: {
  	occupation: occupation,
  	title: 'vector.no.de'
  }});
});

// put
app.put('/occupations/:id', function(req, res) {
  id = req.params.id;
  occupations.set(id, req.body.occupation);
  res.redirect('/occupations/'+id);
});

app.listen(80);
console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);
