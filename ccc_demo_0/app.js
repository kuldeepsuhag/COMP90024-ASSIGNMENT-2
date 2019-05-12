var express = require('express');
var path = require('path');
var favicon = require('static-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
const fs = require('fs');

var routes = require('./routes/index');
var users = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.engine("html", require("jade").__express)
app.set('view engine', 'html');

app.use(favicon());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'views')));
app.use(express.static('views', {extensions: ['html', 'htm']}))
app.use(express.static('public'));
app.use('/', routes);
// app.use('/users', users);

app.post('/positive', function(req, res){
	console.log("receive positive request!");
	var result = fs.readFileSync('./public/cache/positiveMap.json');
	res.send(JSON.parse(result));
});

app.post('/negative', function(req, res){
	console.log("receive negative request!");
	var result = fs.readFileSync('./public/cache/negativeMap.json');
	res.send(JSON.parse(result));
});

app.post('/neutral', function(req, res){
	console.log("receive neutral request!");
	var result = fs.readFileSync('./public/cache/neturalMap.json');
	res.send(JSON.parse(result));
});

app.post('/wrath', function(req, res){
	console.log("receive wrath request!");
	var result = fs.readFileSync('./public/cache/wrathCount.json');
	res.send(JSON.parse(result));
});

app.post('/wrath_map', function(req, res){
	console.log("receive wrath map request!");
	var result = fs.readFileSync('./public/cache/wrathMap.json');
	res.send(JSON.parse(result));
});

app.post('/envy', function(req, res){
	console.log("receive envy request!");
	var result = fs.readFileSync('./public/cache/envyCount.json');
	res.send(JSON.parse(result));
});

app.post('/envy_map', function(req, res){
	console.log("receive envy request!");
	var result = fs.readFileSync('./public/cache/envyMap.json');
	res.send(JSON.parse(result));
});

app.post('/sloth', function(req, res){
	console.log("receive envy request!");
	var result = fs.readFileSync('./public/cache/slothCount.json');
	res.send(JSON.parse(result));
});

app.post('/sloth_map', function(req, res){
	console.log("receive envy request!");
	var result = fs.readFileSync('./public/cache/slothMap.json');
	res.send(JSON.parse(result));
});

app.post('/gluttony', function(req, res){
	console.log("receive envy request!");
	var result = fs.readFileSync('./public/cache/gluttonyCount.json');
	res.send(JSON.parse(result));
});

app.post('/gluttony_map', function(req, res){
	console.log("receive envy request!");
	var result = fs.readFileSync('./public/cache/gluttonyMap.json');
	res.send(JSON.parse(result));
});

app.post('/sentiment_positive', function(req, res){
	console.log("receive positive count request!");
	var result = fs.readFileSync('./public/cache/positiveCount.json');
	res.send(JSON.parse(result));
});

app.post('/sentiment_negative', function(req, res){
	console.log("receive negative count request!");
	var result = fs.readFileSync('./public/cache/negativeCount.json');
	res.send(JSON.parse(result));
});

app.post('/sentiment_neutral', function(req, res){
	console.log("receive neutral request!");
	var result = fs.readFileSync('./public/cache/netrualCount.json');
	res.send(JSON.parse(result));
});

/// catch 404 and forwarding to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});


/// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});


module.exports = app;
