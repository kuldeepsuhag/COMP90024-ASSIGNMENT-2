var express = require('express');
var path = require('path');
var favicon = require('static-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var NodeCouchDb = require('node-couchdb');

var routes = require('./routes/index');
var users = require('./routes/users');

// const couch = new NodeCouchDb({
// 	auth:{
// 		user: 'admin',
// 		password: 'admin'
// 	}
// });

// const dbName = 'tweets';
// const viewUrl = '_design/all_tweets/_view/all';

// couch.listDatabases().then(function(dbs){
// 	console.log(dbs);
// });

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
app.use(express.static('public'));
app.use('/', routes);
app.use('/users', users);

app.post('/', function(req, res){
	console.log("receive get request!");
	couch.get(dbName, viewUrl).then(
		function(data, headers, status){
			var test = 0;
			var Melbourne = 0;
			var Sydeny = 0;
			var ploygon = 0;
			data.data.rows.forEach(function(tweet){
				if(tweet.value.place == "Melbourne"){
					Melbourne++;
				}
				if(tweet.value.place == "Sydney"){
					Sydeny++;
				}
				test++;
				if(tweet.value.ploygon == "Melbourne "){
					ploygon++;
				}
			});
			console.log(test);
			console.log("Melbourne: " + Melbourne + "\n" + "Sydeny: " + Sydeny);
			console.log("Melbourne ploygon: " + ploygon);
			//console.log(data.data.rows);
			console.log(status);
			res.send([Melbourne, Sydeny, ploygon]);
		},
		function(err){
			console.log(err);
			res.send(err);
		});
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
