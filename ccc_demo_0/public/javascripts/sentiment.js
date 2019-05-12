var path = require('path');
var logger = require('morgan');
var bodyParser = require('body-parser');
var NodeCouchDb = require('node-couchdb');
var inside = require('point-in-polygon');
var fs = require('fs');
var os = require('os');


var ipFile = fs.readFileSync('../../ipAddress.txt');
var allIp = ipFile.toString();
var ips = allIp.split(" ");
var ipaddress = ips[0];
console.log(ipaddress);
// var ipaddress;
// var ifaces = os.networkInterfaces();
// Object.keys(ifaces).forEach(function (ifname) {
//   var alias = 0;
//   ifaces[ifname].forEach(function (iface) {
//     if ('IPv4' !== iface.family || iface.internal !== false) {
//       // skip over internal (i.e. 127.0.0.1) and non-ipv4 addresses
//       return;
//     }
//     if(ifname == "eth0" || ifname == 'en0'){
//         ipaddress = iface.address;
//         console.log(ipaddress);
//     }
//   });
// });


const couch = new NodeCouchDb({
    host: ipaddress,
    port: 5984,
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
        var positiveCount = [];
        var negative = [];
        var negativeCount = [];
        var neutral = [];
        var neutralCount = [];
        grids.forEach(function(element){
            positiveCount.push([element[0], 0]);
            negativeCount.push([element[0], 0]);
            neutralCount.push([element[0], 0]);
        });
        data.data.rows.forEach(function(tweet){
            if(tweet.value.place == "Melbourne"){
                var polygon;
                var count = 0;
                for (let i = 0; i < grids.length; i++){
                    polygon = grids[i][1][0][0][0];
                    var contain = inside(tweet.value.coordinates.coordinates, polygon);
                    if (contain){
                        if(tweet.value.label > 0){
                            positive.push(tweet.value.coordinates.coordinates);
                            positiveCount[count][1]++;
                        }else if (tweet.value.label < 0){
                            negative.push(tweet.value.coordinates.coordinates);
                            negativeCount[count][1]++;
                        }else if(tweet.value.label == 0){
                            neutral.push(tweet.value.coordinates.coordinates);
                            neutralCount[count][1]++;
                        }
                        break;
                    }
                    count++;
                }
            }
        });
        fs.writeFile("../cache/positiveMap.json", JSON.stringify(positive), function(err) {
            if(err) {
                return console.log(err);
            }
            console.log("positive map was saved!");
        });

        fs.writeFile("../cache/positiveCount.json", JSON.stringify(positiveCount), function(err) {
            if(err) {
                return console.log(err);
            }
            console.log("positive count was saved!");
        });

        fs.writeFile("../cache/negativeMap.json", JSON.stringify(negative), function(err) {
            if(err) {
                return console.log(err);
            }
            console.log("negative map was saved!");
        });

        fs.writeFile("../cache/negativeCount.json", JSON.stringify(negativeCount), function(err) {
            if(err) {
                return console.log(err);
            }
            console.log("negative count was saved!");
        });

        fs.writeFile("../cache/neturalMap.json", JSON.stringify(neutral), function(err) {
            if(err) {
                return console.log(err);
            }
            console.log("netural map was saved!");
        });

        fs.writeFile("../cache/netrualCount.json", JSON.stringify(neutralCount), function(err) {
            if(err) {
                return console.log(err);
            }
            console.log("netrual count was saved!");
        });
    },
    function(err){
        console.log(err);
        res.send(err);
    });