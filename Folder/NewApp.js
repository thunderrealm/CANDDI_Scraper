// Load & instantiate Readline
var readline = require('readline');
var readlineInstance = readline.createInterface(process.stdin, process.stdout);
// Load request
var request = require('request');
// load & instantiate knwl module. set to english
var knwl = require('knwl.js');
var knwlInstance = new knwl('English');

// load require? is the .listen required?---------------------------------NOT USED YET
var requireLoad = require('require/server').listen(4321);
// load cherio module-----------------------------------------------------NOT USED YET
var cherio = require('cherio');



// container to hold webpage data - added countries to m ake it easier to read. addresses will be used later and countries will be deleted
var webpage = { URL: '', Emails:[], Phones:[], Countries:[], Addresses: [] };

// query is a string of anythign
// callback is a function once the line has been read
readlineInstance.question(`\n\nWhat Webpage would you like to scrape? \n`, function(pageAddress)
{
    // set the URL in th container for printing later - TODO: probably not needed
    webpage.URL = pageAddress;

    request(pageAddress, function (error, response, body)
    {
        console.log(`\nSearching ` + pageAddress + ` for Data.`);

        // Print the error if one occurred
        console.log('error:', error);

        // Print the response status code if a response was received
        console.log('statusCode:', response && response.statusCode);

        // Go and find teh info
        FindThings(body);

        // print the info
        PrintWebpageInfo();
    });

    // This runs before teh finding and printing above does - TODO: not sure how to fix
    // set soemthing we will want to ask say to the user
    readlineInstance.setPrompt('Would You like to Try another page? \n');

    //ask the user teh prompt that was set
    readlineInstance.prompt();

    // when teh user has input a message and pressed enter
    readlineInstance.on('line', function(answer)
    {
        // if the user says tehy dont want to try a new page
        if(answer.toLowerCase().trim() === 'no')
        {
            // close
            readlineInstance.close()
        }
        else if(answer.toLowerCase().trim() === 'yes')
        {
            // TODO: make teh code repeatable
            console.log(`\n\n\nSome code goes in this area so you can enter a new webpage. \n but Its not there currently so im going to exit`);
            readlineInstance.close()
        }
        else
        {
            readlineInstance.setPrompt(`\nI didn't understand that.\nWould You like to Try another page? (yes or no)\n`);
            readlineInstance.prompt();
        }
    });

});

// when we hear the close fucntion call
readlineInstance.on('close', function()
{
    console.log(`\nWell that was fun.\nGoodbye!`);

    //exit the process - do we ned readlineInstance.close() AND process.exit()?????
    process.exit();
});

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
    var gotPhones = knwlInstance.get('phones');

    //parse the data we care about into a readable format
    for (i=0; i < gotPhones.length; i++)
    {
        webpage.Phones.push(gotPhones[i].phone);
    }
}

function GetEmails(input)
{
    // Grab the emails in the string
    var gotEmails = knwlInstance.get('emails');
    
    //parse the data we care about into a readable format
    for (i=0; i < gotEmails.length; i++)
    {
        webpage.Emails.push(gotEmails[i].address);
    }
}

function GetLocs(input) // ONLY RETURNS A COUNTRY TODO: got to find the actual address but for now a country will do
{
    // Grab the Locations in the string
    var gotCountries = knwlInstance.get('places');
    
    //parse the data we care about into a readable format
    for (i=0; i < gotCountries.length; i++)
    {      
        webpage.Countries.push(gotCountries[i].place);
    }

}

function PrintWebpageInfo()
{
    console.log(`\n We looked at ` + webpage.URL + ` and; \n`);
 
    // TODO this should be a for loop, with a switch case inside it maybe?
    // or not even a loop. maybe concolse.log(webpage); ???
    if(webpage.Phones[0])
    {
        console.log("\n Phone Numbers as follows")
        console.log(webpage.Phones);
    }
    else
    {
        console.log("\n no phone numbers found")
    }

    if(webpage.Emails[0])
    {
        console.log("\n Email Addresses as follows")
        console.log(webpage.Emails);
    }
    else
    {
        console.log("\n no emails found")
    }

    if(webpage.Countries[0])
    {
        console.log("\n Countries as follows")
        console.log(webpage.Countries);
    }
    else
    {
        console.log("\n no countries found")
    }

}