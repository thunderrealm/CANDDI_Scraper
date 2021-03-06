// load require? is the .listen required?
var requireLoad = require('require/server').listen(4321);

// load cherio module
var cherio = require('cherio');

// load knwl module
var knwl = require('knwl.js');
var knwlInstance = new knwl('English');

// load https
//const https = require('https');
//const http = require('http');

console.log("\n The modules are loaded \n");

// create a container to store teh main info we want in
var phoneList = [];
var emailList = [];
var locList = [];

// copied from https://www.twilio.com/blog/2017/08/http-requests-in-node-js.html

// TODO: check if its http or https for each site
// TODO: put into a function that takes a URL string as a parameter
var URLin = 'https://www.canddi.com';

console.log("\nSearching " + URLin + " for data.")

// https.get(URLin, (resp) =>
// {
//   let data = '';

//   // A chunk of data has been recieved.
//   resp.on('data', (chunk) => {data += chunk;});

//   // The whole response has been received. Print out the result.
//   resp.on('end', ()    => {FindThings(data);});

// }).on("error", (err) => {console.log("Error: " + err.message);});



function FindThings(input)
{
    // initialise the string of html - IMPORTANT
    knwlInstance.init(input);

    // grab the info
    GetEmails(input);
    GetPhones(input);
    GetLocs(input);
    
}

function GetPhones(input)
{
    // Grab the phones in the string
    var phones = knwlInstance.get('phones');

    //parse the data we care about into a readable format
    for (i=0; i < phones.length; i++)
    {
        phoneList.push(phones[i].phone);
    }

    // print the phone numbers - if tehre are 1 or more
    // THIS PRINTS OUT IN THE FORMAT (plugin properties, preiview, instances found)
    if(phoneList[0])
    {
        console.log("\n Phone Numbers as follows")
        console.log(phoneList);
    }
    else
    {
        console.log("\n no phone numbers found")
    }
}

function GetEmails(input)
{
    // Grab the emails in the string
    var emails = knwlInstance.get('emails');
    
    //parse the data we care about into a readable format
    for (i=0; i < emails.length; i++)
    {
        emailList.push(emails[i].address);
    }

    // print the emails
    // THIS PRINTS OUT IN THE FORMAT (plugin properties, preiview, instances found)
    if(emailList[0])
    {
        console.log("\n Email Addresses as follows")
        console.log(emailList);
    }
    else
    {
        console.log("\n no emails found")
    }
}

function GetLocs(input) // ONLY RETURNS A COUNTRY
{
    // Grab the Locations in the string
    var places = knwlInstance.get('places');
    
    //parse the data we care about into a readable format
    for (i=0; i < places.length; i++)
    {
        // create a string from the info given to us
        // will be something like places[i].Streetname + places[i].city + places[i].postcode
        var address = '';
      
        locList.push(places[i].place);
    }

    // print the addresses
    // THIS PRINTS OUT IN THE FORMAT (plugin properties, preiview, instances found)
    if(locList[0])
    {
        console.log("\n Countries as follows")
        console.log(locList);
    }
    else
    {
        console.log("\n no addresses found")
    }
}


var request = require('request');
request(URLin, function (error, response, body)
{
    console.log(`good evening _______________________________________________________________`)
    console.log('error:', error); // Print the error if one occurred
    console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
    //console.log('body:', body); // Print the HTML for the Google homepage.

    FindThings(body);
});

