var path = require('path');
var NodeCouchDb = require('node-couchdb');
const fs = require('fs');
const couch = new NodeCouchDb({
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