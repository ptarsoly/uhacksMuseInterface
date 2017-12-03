var nodeMuse = require("node-muse");
var express = require('express');

var jsonData = {
    'blink':0,
    'concentration':0.0,
    'mellow':0.0
};

var app = express();
app.listen(3001);

app.get('/data', (req, res) => {
    res.send(jsonData);
});


var Muse = nodeMuse.Muse;
var OSC = nodeMuse.OSC;
var blinkCount = 0;



Muse.on('/muse/elements/blink', function(data){
    if(data.values == 1 && jsonData.blink != 1) {
        jsonData.blink = 1;
    }
    else if(data.values == 0 && jsonData.blink != 0) {
        jsonData.blink = 0;
    }
});

Muse.on('/muse/experimental/concentration', function(data) {
    jsonData.concentration = data.values;

});

Muse.on('/muse/experimental/mellow', function(data) {
    jsonData.mellow = data.values;
});

nodeMuse.connect();


