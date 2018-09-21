// includes
var readline = require('readline');

// this is a variable that IS the line being read?
// no the isntanceof teh readline
var readlineInstance = readline.createInterface(process.stdin, process.stdout);

// from teh tutorial on eradline
var realPerson = { name: '', sayings:[] };

// query is a string of anythign
// callback is a function once the line has been read
readlineInstance.question("What is my name? \n", function(answer)
{
    // set the persons name
    realPerson.name = answer;

    // set soemthing we will want to ask say to the user
    readlineInstance.setPrompt('what would '+ realPerson.name +' say? \n');

    //ask the user teh prompt that was set
    readlineInstance.prompt();

    // when teh user has input a message and pressed enter
    readlineInstance.on('line', function(saying)
    {
        // might push exit onto teh end of the sayings list?
        // push teh new saying onto teh array of sayings
        //realPerson.sayings.push(saying.trim());

        // if the user types exit
        if(saying.toLowerCase().trim() === 'exit')
        {
            // close
            readlineInstance.close()
        }
        else
        {
            // push teh new saying onto teh array of sayings
            realPerson.sayings.push(saying.trim());

            // create a new prompt
            readlineInstance.setPrompt(`what else would `+ realPerson.name +` say? ('exit' to leave) \n`);

            // output that to the user
            readlineInstance.prompt();
        }
    });
});

// whne we hear the close fucntion call
readlineInstance.on('close', function()
{
    // %s in console log is a palceholder for a string - replace teh second argument iwth that string
    // %j in console will replace with a JSON string
    console.log("%s is a real person that says %j", realPerson.name, realPerson.sayings);

    //exit the process - do we ned readlineInstance.close() AND process.exit()?????
    process.exit();
});