var path = require('path');
var NodeCouchDb = require('node-couchdb');
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
const wrathUrl = '_design/all%20views/_view/melbourne_wrath';
const envyUrl = '_design/all%20views/_view/melbourne_envy';
const slothUrl = '_design/all%20views/_view/melbourne_sloth';
const gluttonyUrl = '_design/all%20views/_view/melbourne_gluttony';
const urls = [wrathUrl, envyUrl, slothUrl, gluttonyUrl];
const sins = ["wrath", "envy", "sloth", "gluttony"];

function syncData(){
    for (let j = 0; j < urls.length; j++){
        couch.get(dbName, urls[j]).then(
            function(data, headers, status){
                var result = [];
                data.data.rows.forEach(function(tweet){
                    if(tweet.value.place == "Melbourne"){
                        result.push(tweet.value.coordinates.coordinates);
                    }
                });
                console.log(result.length);
                fs.writeFile("../cache/" + sins[j] + "Map.json", JSON.stringify(result), function(err) {
                    if(err) {
                        return console.log(err);
                    }
                    console.log(sins[j] + "Map.json was saved!");
                });
            },
            function(err){
                console.log(err);
                res.send(err);
            });
    }
}

syncData();