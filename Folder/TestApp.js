// load require? is this required?
var requireLoad = require('require/server').listen(1234);

// load cherio module
var cherio = require('cherio');

// load knwl module
var knwl = require('knwl.js');
var knwlInstance = new knwl('English');

var msg = "The modules are loaded";
console.log(msg);

