require("dotenv").config();


// Packages
var fs = require("fs");
var keys = require("./keys.js")
var axios = require("axios");
// var moment = require("moment");
var Spotify = require("node-spotify-api");
var spotify = new Spotify(keys.spotify)

// User Input
//process.argv property returns an array containing the command line arguments passed when the Node.js process was launched
var userChoice = process.argv[2];
var userQuery = process.argv[3];

for (var i = 4; i < process.argv.length; i++) {
    if (i > 4 && i < process.argv.length) {
        userQuery += "+" + process.argv[i]; 
    }
    else {
        userQuery += process.argv[i];
    }
}

//Using switch instead of other loops to work more with the user
// This is how it works:
// The switch expression is evaluated once.
// The value of the expression is compared with the values of each case.
// If there is a match, the associated block of code is executed.

switch (userChoice) {
    case "spotify-this-song":
        spotifyThis();
        break;
    case "movie-this":
        movies();
        break;
    case "do-what-it-says":
        doThis();
        break;
    default:
        logThis("Please enter a valid search term, such as ");
        logThis("{spotify-this-song}, {movie-this}, or {do-what-it-says}");
        break;
}

// Spotify function
function spotifyThis() {

    // Catch empty input
    if (!userQuery) {
        userQuery = "Wait for Me";
    }

    spotify.search({type: "track", query: userQuery}, function(err, data) {
        if (err) {
            logThis(err);
        }
//add else statement for wrong input

//Once user input is placed, these should be logged on the screen
        var userSong = data.tracks.items;
        logThis("Artist: " + userSong[0].artists[0].name);
        logThis("Song Name: " + userSong[0].name);
        logThis("Preview Link: " + userSong[0].preview_url);
        logThis("Album: " + userSong[0].album.name);
    });
};

function movies() {

    if (!userQuery) {
        userQuery = "Mr. Nobody";
        logThis("If you haven't watched 'Mr. Nobody,' then you should: <http://www.imdb.com/title/tt0485947/>");
        logThis("It's on Netflix!");
    }
    
    axios.get("http://www.omdbapi.com/?t=" + userQuery + "&y=&plot=short&apikey=" + keys.movies.id)
    .then(function(response) {

        logThis("Title: " + response.data.Title);
        logThis("Year Released: " + response.data.Year);
        logThis("IMDB rating: " + response.data.imdbRating);
        logThis("Rotten Tomatoes Rating: " + response.data.Ratings[1].Value);
        logThis("Country/Countries Produced: " + response.data.Country);
        logThis("Language: " + response.data.Language);
        logThis("Plot: " + response.data.Plot);
        logThis("Cast: " + response.data.Actors);
    });
};



function doThis () {
    fs.readFile("random.txt", "utf8", function(err, data) {

        if (err) {
            logThis(err);
        }

        var readArray = data.split(",");

        userQuery = readArray[1];

        spotifyThis(userQuery);
    })
};

//Logging functions
function logThis (logQuery) {

    console.log(logQuery);

    fs.appendFile("log.txt", logQuery, function(err) {
        if (err) {
            return logThis("Error: " + err);
        }
    });
};