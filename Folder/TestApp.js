// load require? is the .listen required?
var requireLoad = require('require/server').listen(4321);

// load cherio module
var cherio = require('cherio');

// load knwl module
var knwl = require('knwl.js');
var knwlInstance = new knwl('English');

// load https
const https = require('https');

var msg = "The modules are loaded";
console.log(msg);

// copied from https://www.twilio.com/blog/2017/08/http-requests-in-node-js.html
// seems to get the description of the astronomy picture of the day
// commented out so i have a copy that i can refer back to
// https.get('https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY', (resp) =>
// {
//   let data = '';

//   // A chunk of data has been recieved.
//   resp.on('data', (chunk) => {data += chunk;});

//   // The whole response has been received. Print out the result.
//   resp.on('end', () => {console.log(JSON.parse(data).explanation);});

// }).on("error", (err) => {console.log("Error: " + err.message);});

https.get('https://www.canddi.com', (resp) =>
{
  let data = '';

  // A chunk of data has been recieved.
  resp.on('data', (chunk) => {data += chunk;});

  // The whole response has been received. Print out the result.
  resp.on('end', ()    => {/*console.log("got the data")*/  FindThings(data);});

}).on("error", (err) => {console.log("Error: " + err.message);});

function FindThings(input)
{
    // initialise the string - IMPORTANT
    knwlInstance.init(input);

    // Grab the emails in the string
    var emails = knwlInstance.get('emails');

    // THIS PRINTS OUT IN THE FORMAT (plugin properties, preiview, instances found)
    if(emails[0])
    {
        console.log(emails[0].found);
    }
    else
    {
        console.log("nothing in there")
    }


}