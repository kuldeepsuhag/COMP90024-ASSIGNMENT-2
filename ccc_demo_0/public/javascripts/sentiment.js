var path = require('path');
var logger = require('morgan');
var bodyParser = require('body-parser');
var NodeCouchDb = require('node-couchdb');
var inside = require('point-in-polygon');
const fs = require('fs');

const couch = new NodeCouchDb({
	auth:{
		user: 'admin',
		password: 'admin'
	}
});

const dbName = 'tweets_view';
const viewUrl = '_design/all_tweets/_view/all';
const wrathUrl = '_design/all%20views/_view/melbourne_wrath';
const envyUrl = '_design/all%20views/_view/melbourne_envy';
const slothUrl = '_design/all%20views/_view/melbourne_sloth';
const gluttonyUrl = '_design/all%20views/_view/melbourne_gluttony';
const urls = [wrathUrl, envyUrl, slothUrl, gluttonyUrl];
const sins = ["wrath", "envy", "sloth", "gluttony"];

var rawGrid = fs.readFileSync('../cache/mel_polygen.json');
var grid = JSON.parse(rawGrid);
var grids = Object.entries(grid);
couch.get(dbName, viewUrl).then(
    function(data, headers, status){
        var positive = [];
        var negative = [];
        var neutral = [];
        data.data.rows.forEach(function(tweet){
            if(tweet.value.place == "Melbourne"){
                if(tweet.value.label == "Positive"){
                    positive.push(tweet.value.coordinates.coordinates);
                }else if (tweet.value.label == "Negative"){
                    negative.push(tweet.value.coordinates.coordinates);
                }else if(tweet.value.label == "Neutral"){
                    neutral.push(tweet.value.coordinates.coordinates);
                }
            }
        });
        fs.writeFile("../cache/positiveMap.json", JSON.stringify(positive), function(err) {
            if(err) {
                return console.log(err);
            }
            console.log("positive map was saved!");
        });

        fs.writeFile("../cache/negativeMap.json", JSON.stringify(negative), function(err) {
            if(err) {
                return console.log(err);
            }
            console.log("negative map was saved!");
        });

        fs.writeFile("../cache/neturalMap.json", JSON.stringify(neutral), function(err) {
            if(err) {
                return console.log(err);
            }
            console.log("netural map was saved!");
        });
    },
    function(err){
        console.log(err);
        res.send(err);
    });