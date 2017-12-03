var nodeMuse = require('node-muse');
var request = require('request-json');
var client = request.createClient('http://10.223.57.29:8011');
 
var jsonData = {
    'blink':0,
    'concentration':0.0,
    'mellow':0.0
};

var Muse = nodeMuse.Muse;
var OSC = nodeMuse.OSC;
var blinkCount = 0;

Muse.on('/muse/elements/blink', function(data){
    jsonData.blink = data.values;
    if(jsonData.blink  == 1) {
        console.log("BLINK");
        client.post('/posts/', jsonData, function(err, res, body) {
            return console.log(res.statusCode);
          });
    }
    

});

Muse.on('/muse/elements/experimental/concentration', function(data) {
    jsonData.concentration = data.values;
    if(jsonData.concentration >= 0.5) {
        console.log("Concentrating");
        client.post('/posts/', jsonData, function(err, res, body) {
            return console.log(res.statusCode);
          });
    }
    
});

Muse.on('/muse/elements/experimental/mellow', function(data) {
    jsonData.mellow = data.values;
    if(jsonData.mellow >= 0.5) {
        console.log("Mellowing out");
        client.post('/posts/', jsonData, function(err, res, body) {
            return console.log(res.statusCode);
          });
    }
    
});

Muse.on('disconnected', function(){
    console.log("No sensor =  no fun");
});

nodeMuse.connect();


