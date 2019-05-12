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

const dbName = 'testdata';
const viewUrl = '_design/test/_view/melbourne';
const assaultUrl = '_design/test/_view/assault';


var rawGrid = fs.readFileSync('../cache/mel_polygen.json');
var grid = JSON.parse(rawGrid);
var grids = Object.entries(grid);

var allTweets = fs.readFileSync('../cache/melbourne.json');
var all = JSON.parse(allTweets);
    couch.get(dbName, assaultUrl).then(
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
                    result[i][2] = (result[i][1]/all[i][1])*100;
                }else{
                    result[i][2] = 0;
                }
            }
            
            fs.writeFile("../cache/assaultCount.json", JSON.stringify(result), function(err) {
                if(err) {
                    return console.log(err);
                }
                console.log("assaultCount was saved!");
            });
        },
        function(err){
            console.log(err);
        });