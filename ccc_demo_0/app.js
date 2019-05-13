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

app.post('/gluttony_par', function(req, res){
	console.log("receive gluttony r request!");
	var temp = fs.readFileSync('./public/cache/gluttonyCount.json');
	var tempAurin = fs.readFileSync('./views/dataSource/Aurin/aurin_mel.json');
	temp = JSON.parse(temp);
	tempAurin = JSON.parse(tempAurin);
	var x = [];
	var y = tempAurin.overweight;
	for (let i = 0; i < temp.length; i++){
		x.push(temp[i][2]);
	}
	var result = binArg(x, y);
	console.log(result);
	res.send([result]);
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

app.post('/arson', function(req, res){
	console.log("receive arsonrequest!");
	var result = fs.readFileSync('./public/cache/arsonCount.json');
	res.send(JSON.parse(result));
});

app.post('/aurin_arson', function(req, res){
	console.log("receive arson request!");
	var result = fs.readFileSync('./views/dataSource/AURIN/aurin_mel.json');
	var aurin = JSON.parse(result);
	res.send(aurin.arson);
});

app.post('/assault', function(req, res){
	console.log("receive arsonrequest!");
	var result = fs.readFileSync('./public/cache/assaultCount.json');
	res.send(JSON.parse(result));
});

app.post('/aurin_assault', function(req, res){
	console.log("receive arson request!");
	var result = fs.readFileSync('./views/dataSource/AURIN/aurin_mel.json');
	var aurin = JSON.parse(result);
	res.send(aurin.assault);
});

app.post('/Banyule_count', function(req, res){
	console.log("receive banyule_coun request!");
	var gluttony = JSON.parse(fs.readFileSync('./public/cache/gluttonyCount.json'));
	var wrath = JSON.parse(fs.readFileSync('./public/cache/wrathCount.json'));
	var sloth = JSON.parse(fs.readFileSync('./public/cache/slothCount.json'));
	result = [wrath[0][1], sloth[0][1], gluttony[0][1]];
	res.send(result);
});

app.post('/Bayside_count', function(req, res){
	console.log("receive banyule_coun request!");
	var gluttony = JSON.parse(fs.readFileSync('./public/cache/gluttonyCount.json'));
	var wrath = JSON.parse(fs.readFileSync('./public/cache/wrathCount.json'));
	var sloth = JSON.parse(fs.readFileSync('./public/cache/slothCount.json'));
	result = [wrath[1][1], sloth[1][1], gluttony[1][1]];
	res.send(result);
});

app.post('/Boroondara_count', function(req, res){
	console.log("receive banyule_coun request!");
	var gluttony = JSON.parse(fs.readFileSync('./public/cache/gluttonyCount.json'));
	var wrath = JSON.parse(fs.readFileSync('./public/cache/wrathCount.json'));
	var sloth = JSON.parse(fs.readFileSync('./public/cache/slothCount.json'));
	result = [wrath[2][1], sloth[2][1], gluttony[2][1]];
	res.send(result);
});

app.post('/Brimbank_count', function(req, res){
	console.log("receive banyule_coun request!");
	var gluttony = JSON.parse(fs.readFileSync('./public/cache/gluttonyCount.json'));
	var wrath = JSON.parse(fs.readFileSync('./public/cache/wrathCount.json'));
	var sloth = JSON.parse(fs.readFileSync('./public/cache/slothCount.json'));
	result = [wrath[3][1], sloth[3][1], gluttony[3][1]];
	res.send(result);
});

app.post('/Casey_count', function(req, res){
	console.log("receive banyule_coun request!");
	var gluttony = JSON.parse(fs.readFileSync('./public/cache/gluttonyCount.json'));
	var wrath = JSON.parse(fs.readFileSync('./public/cache/wrathCount.json'));
	var sloth = JSON.parse(fs.readFileSync('./public/cache/slothCount.json'));
	result = [wrath[4][1], sloth[4][1], gluttony[4][1]];
	res.send(result);
});

app.post('/Darebin_count', function(req, res){
	console.log("receive banyule_coun request!");
	var gluttony = JSON.parse(fs.readFileSync('./public/cache/gluttonyCount.json'));
	var wrath = JSON.parse(fs.readFileSync('./public/cache/wrathCount.json'));
	var sloth = JSON.parse(fs.readFileSync('./public/cache/slothCount.json'));
	result = [wrath[5][1], sloth[5][1], gluttony[5][1]];
	res.send(result);
});

app.post('/Frankston_count', function(req, res){
	console.log("receive banyule_coun request!");
	var gluttony = JSON.parse(fs.readFileSync('./public/cache/gluttonyCount.json'));
	var wrath = JSON.parse(fs.readFileSync('./public/cache/wrathCount.json'));
	var sloth = JSON.parse(fs.readFileSync('./public/cache/slothCount.json'));
	result = [wrath[6][1], sloth[6][1], gluttony[6][1]];
	res.send(result);
});

app.post('/Hobsons_Bay_count', function(req, res){
	console.log("receive banyule_coun request!");
	var gluttony = JSON.parse(fs.readFileSync('./public/cache/gluttonyCount.json'));
	var wrath = JSON.parse(fs.readFileSync('./public/cache/wrathCount.json'));
	var sloth = JSON.parse(fs.readFileSync('./public/cache/slothCount.json'));
	result = [wrath[7][1], sloth[7][1], gluttony[7][1]];
	res.send(result);
});

app.post('/Hume_count', function(req, res){
	console.log("receive banyule_coun request!");
	var gluttony = JSON.parse(fs.readFileSync('./public/cache/gluttonyCount.json'));
	var wrath = JSON.parse(fs.readFileSync('./public/cache/wrathCount.json'));
	var sloth = JSON.parse(fs.readFileSync('./public/cache/slothCount.json'));
	result = [wrath[8][1], sloth[8][1], gluttony[8][1]];
	res.send(result);
});

app.post('/Kingston_count', function(req, res){
	console.log("receive banyule_coun request!");
	var gluttony = JSON.parse(fs.readFileSync('./public/cache/gluttonyCount.json'));
	var wrath = JSON.parse(fs.readFileSync('./public/cache/wrathCount.json'));
	var sloth = JSON.parse(fs.readFileSync('./public/cache/slothCount.json'));
	result = [wrath[9][1], sloth[9][1], gluttony[9][1]];
	res.send(result);
});

app.post('/Knox_count', function(req, res){
	console.log("receive banyule_coun request!");
	var gluttony = JSON.parse(fs.readFileSync('./public/cache/gluttonyCount.json'));
	var wrath = JSON.parse(fs.readFileSync('./public/cache/wrathCount.json'));
	var sloth = JSON.parse(fs.readFileSync('./public/cache/slothCount.json'));
	result = [wrath[10][1], sloth[10][1], gluttony[10][1]];
	res.send(result);
});

app.post('/Manningham_count', function(req, res){
	console.log("receive banyule_coun request!");
	var gluttony = JSON.parse(fs.readFileSync('./public/cache/gluttonyCount.json'));
	var wrath = JSON.parse(fs.readFileSync('./public/cache/wrathCount.json'));
	var sloth = JSON.parse(fs.readFileSync('./public/cache/slothCount.json'));
	result = [wrath[11][1], sloth[11][1], gluttony[11][1]];
	res.send(result);
});

app.post('/Maribyrnong', function(req, res){
	console.log("receive banyule_coun request!");
	var gluttony = JSON.parse(fs.readFileSync('./public/cache/gluttonyCount.json'));
	var wrath = JSON.parse(fs.readFileSync('./public/cache/wrathCount.json'));
	var sloth = JSON.parse(fs.readFileSync('./public/cache/slothCount.json'));
	result = [wrath[12][1], sloth[12][1], gluttony[12][1]];
	res.send(result);
});

app.post('/Maroondah_count', function(req, res){
	console.log("receive banyule_coun request!");
	var gluttony = JSON.parse(fs.readFileSync('./public/cache/gluttonyCount.json'));
	var wrath = JSON.parse(fs.readFileSync('./public/cache/wrathCount.json'));
	var sloth = JSON.parse(fs.readFileSync('./public/cache/slothCount.json'));
	result = [wrath[13][1], sloth[13][1], gluttony[13][1]];
	res.send(result);
});

app.post('/Melbourne_count', function(req, res){
	console.log("receive banyule_coun request!");
	var gluttony = JSON.parse(fs.readFileSync('./public/cache/gluttonyCount.json'));
	var wrath = JSON.parse(fs.readFileSync('./public/cache/wrathCount.json'));
	var sloth = JSON.parse(fs.readFileSync('./public/cache/slothCount.json'));
	result = [wrath[14][1], sloth[14][1], gluttony[14][1]];
	res.send(result);
});

app.post('/Melton_count', function(req, res){
	console.log("receive banyule_coun request!");
	var gluttony = JSON.parse(fs.readFileSync('./public/cache/gluttonyCount.json'));
	var wrath = JSON.parse(fs.readFileSync('./public/cache/wrathCount.json'));
	var sloth = JSON.parse(fs.readFileSync('./public/cache/slothCount.json'));
	result = [wrath[15][1], sloth[15][1], gluttony[15][1]];
	res.send(result);
});

app.post('/Monash_count', function(req, res){
	console.log("receive banyule_coun request!");
	var gluttony = JSON.parse(fs.readFileSync('./public/cache/gluttonyCount.json'));
	var wrath = JSON.parse(fs.readFileSync('./public/cache/wrathCount.json'));
	var sloth = JSON.parse(fs.readFileSync('./public/cache/slothCount.json'));
	result = [wrath[16][1], sloth[16][1], gluttony[16][1]];
	res.send(result);
});

app.post('/Moonee_Valley_count', function(req, res){
	console.log("receive banyule_coun request!");
	var gluttony = JSON.parse(fs.readFileSync('./public/cache/gluttonyCount.json'));
	var wrath = JSON.parse(fs.readFileSync('./public/cache/wrathCount.json'));
	var sloth = JSON.parse(fs.readFileSync('./public/cache/slothCount.json'));
	result = [wrath[17][1], sloth[17][1], gluttony[17][1]];
	res.send(result);
});

app.post('/Moreland_count', function(req, res){
	console.log("receive banyule_coun request!");
	var gluttony = JSON.parse(fs.readFileSync('./public/cache/gluttonyCount.json'));
	var wrath = JSON.parse(fs.readFileSync('./public/cache/wrathCount.json'));
	var sloth = JSON.parse(fs.readFileSync('./public/cache/slothCount.json'));
	result = [wrath[18][1], sloth[18][1], gluttony[18][1]];
	res.send(result);
});

app.post('/Nillumbik_count', function(req, res){
	console.log("receive banyule_coun request!");
	var gluttony = JSON.parse(fs.readFileSync('./public/cache/gluttonyCount.json'));
	var wrath = JSON.parse(fs.readFileSync('./public/cache/wrathCount.json'));
	var sloth = JSON.parse(fs.readFileSync('./public/cache/slothCount.json'));
	result = [wrath[19][1], sloth[19][1], gluttony[19][1]];
	res.send(result);
});

app.post('/Port_Phillip_count', function(req, res){
	console.log("receive banyule_coun request!");
	var gluttony = JSON.parse(fs.readFileSync('./public/cache/gluttonyCount.json'));
	var wrath = JSON.parse(fs.readFileSync('./public/cache/wrathCount.json'));
	var sloth = JSON.parse(fs.readFileSync('./public/cache/slothCount.json'));
	result = [wrath[20][1], sloth[20][1], gluttony[20][1]];
	res.send(result);
});

app.post('/Queenscliffe_count', function(req, res){
	console.log("receive banyule_coun request!");
	var gluttony = JSON.parse(fs.readFileSync('./public/cache/gluttonyCount.json'));
	var wrath = JSON.parse(fs.readFileSync('./public/cache/wrathCount.json'));
	var sloth = JSON.parse(fs.readFileSync('./public/cache/slothCount.json'));
	result = [wrath[21][1], sloth[21][1], gluttony[21][1]];
	res.send(result);
});

app.post('/Stonnington_count', function(req, res){
	console.log("receive banyule_coun request!");
	var gluttony = JSON.parse(fs.readFileSync('./public/cache/gluttonyCount.json'));
	var wrath = JSON.parse(fs.readFileSync('./public/cache/wrathCount.json'));
	var sloth = JSON.parse(fs.readFileSync('./public/cache/slothCount.json'));
	result = [wrath[22][1], sloth[22][1], gluttony[22][1]];
	res.send(result);
});

app.post('/Whitehorse_count', function(req, res){
	console.log("receive banyule_coun request!");
	var gluttony = JSON.parse(fs.readFileSync('./public/cache/gluttonyCount.json'));
	var wrath = JSON.parse(fs.readFileSync('./public/cache/wrathCount.json'));
	var sloth = JSON.parse(fs.readFileSync('./public/cache/slothCount.json'));
	result = [wrath[23][1], sloth[23][1], gluttony[23][1]];
	res.send(result);
});

app.post('/Whittlesea_count', function(req, res){
	console.log("receive banyule_coun request!");
	var gluttony = JSON.parse(fs.readFileSync('./public/cache/gluttonyCount.json'));
	var wrath = JSON.parse(fs.readFileSync('./public/cache/wrathCount.json'));
	var sloth = JSON.parse(fs.readFileSync('./public/cache/slothCount.json'));
	result = [wrath[24][1], sloth[24][1], gluttony[24][1]];
	res.send(result);
});

app.post('/Wyndham_count', function(req, res){
	console.log("receive banyule_coun request!");
	var gluttony = JSON.parse(fs.readFileSync('./public/cache/gluttonyCount.json'));
	var wrath = JSON.parse(fs.readFileSync('./public/cache/wrathCount.json'));
	var sloth = JSON.parse(fs.readFileSync('./public/cache/slothCount.json'));
	result = [wrath[25][1], sloth[25][1], gluttony[25][1]];
	res.send(result);
});

app.post('/Yarra_count', function(req, res){
	console.log("receive banyule_coun request!");
	var gluttony = JSON.parse(fs.readFileSync('./public/cache/gluttonyCount.json'));
	var wrath = JSON.parse(fs.readFileSync('./public/cache/wrathCount.json'));
	var sloth = JSON.parse(fs.readFileSync('./public/cache/slothCount.json'));
	result = [wrath[26][1], sloth[26][1], gluttony[26][1]];
	res.send(result);
});

app.post('/Yarra_Ranges_count', function(req, res){
	console.log("receive banyule_coun request!");
	var gluttony = JSON.parse(fs.readFileSync('./public/cache/gluttonyCount.json'));
	var wrath = JSON.parse(fs.readFileSync('./public/cache/wrathCount.json'));
	var sloth = JSON.parse(fs.readFileSync('./public/cache/slothCount.json'));
	result = [wrath[27][1], sloth[27][1], gluttony[27][1]];
	res.send(result);
});

app.post('/Glen_Eira_count', function(req, res){
	console.log("receive banyule_coun request!");
	var gluttony = JSON.parse(fs.readFileSync('./public/cache/gluttonyCount.json'));
	var wrath = JSON.parse(fs.readFileSync('./public/cache/wrathCount.json'));
	var sloth = JSON.parse(fs.readFileSync('./public/cache/slothCount.json'));
	result = [wrath[28][1], sloth[28][1], gluttony[28][1]];
	res.send(result);
});

app.post('/Greater_Geelong_count', function(req, res){
	console.log("receive banyule_coun request!");
	var gluttony = JSON.parse(fs.readFileSync('./public/cache/gluttonyCount.json'));
	var wrath = JSON.parse(fs.readFileSync('./public/cache/wrathCount.json'));
	var sloth = JSON.parse(fs.readFileSync('./public/cache/slothCount.json'));
	result = [wrath[29][1], sloth[29][1], gluttony[29][1]];
	res.send(result);
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

function binArg(x,y){
	var i, xSquSum=0, xSum=0, ySum=0, xySum=0, maxLinearityError=0, linearityError=0, idealY;
	var b=0, a=0, r = 0;
	var yAver = 0, sst = 0, ssr = 0;
	for(i=0; i<x.length; i++)
		xSum += x[i];
	for(i=0; i<x.length; i++)
		ySum += y[i];
	for(i=0; i<x.length; i++)
		xySum += x[i]*y[i];
	for(i=0; i<x.length; i++)
		xSquSum += x[i]*x[i];
	b = ((xSquSum*ySum)-(xSum*xySum))/(x.length*xSquSum-xSum*xSum);
	a = (x.length*xySum-xSum*ySum)/(x.length*xSquSum-xSum*xSum);
	yAver = ySum/(y.length);
	for(i=0; i<x.length; i++)
	{
		sst += (y[i] - yAver)*(y[i] - yAver);
		ssr += (a*x[i] + b - yAver)*(a*x[i] + b - yAver);
		r = 1 - (sst - ssr)/sst;
	}
	return r;
}


module.exports = app;
