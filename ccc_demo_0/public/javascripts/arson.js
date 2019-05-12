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

const dbName = 'testdata';
const viewUrl = '_design/test/_view/melbourne';
const arsonUrl = '_design/test/_view/arson';


var rawGrid = fs.readFileSync('../cache/mel_polygen.json');
var grid = JSON.parse(rawGrid);
var grids = Object.entries(grid);

var allTweets = fs.readFileSync('../cache/melbourne.json');
var all = JSON.parse(allTweets);
    couch.get(dbName, arsonUrl).then(
        function(data, headers, status){
            var result = [];
            var tweetsCount = 0;
            grids.forEach(function(element){
                result.push([element[0], 0, 0]);
            });
            data.data.rows.forEach(function(tweet){
                if(tweet.value.place == "Melbourne" && tweet.value.coordinates != null){
                    var polygon;
                    var count = 0;
                    for (let i = 0; i < grids.length; i++){
                        polygon = grids[i][1][0][0][0];
                        var contain = inside(tweet.value.coordinates.coordinates, polygon);
                        if (contain){
                            result[count][1]++;
                            break;
                        }
                        count++;
                    }
                }
                tweetsCount++;
            });
            console.log(tweetsCount);
            for(let i = 0; i < result.length; i++){
                if(all[i][1] != 0){
                    result[i][2] = (result[i][1]/all[i][1]) * 100;
                }else{
                    result[i][2] = 0;
                }
            }
            
            fs.writeFile("../cache/arsonCount.json", JSON.stringify(result), function(err) {
                if(err) {
                    return console.log(err);
                }
                console.log("arsonCount was saved!");
            });
        },
        function(err){
            console.log(err);
        });