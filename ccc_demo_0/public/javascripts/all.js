// Team: team 9
// City: Melbourne Australia
// Class: COMP90024 ASSIGNMENT 2 - Semester 2, 2019
// Member 1: Naiyun Wu - 1008438
// Member 2: Kuldeep Suhag - 919397
// Member 3: Hongtao Ni - 938737
// Member 4: Duoyi Zhang - 956812
// Member 5: Zexian Huang - 1012710

//The file will count the number of tweets in each polygon.
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
            var result = [];
            var tweetsCount = 0;
            grids.forEach(function(element){
                result.push([element[0], 0]);
            });
            data.data.rows.forEach(function(tweet){
                if(tweet.value.place == "Melbourne"){
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
            
            fs.writeFile("../cache/all.json", JSON.stringify(result), function(err) {
                if(err) {
                    return console.log(err);
                }
                console.log("all was saved!");
            });
        },
        function(err){
            console.log(err);
        });