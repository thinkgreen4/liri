require("dotenv").config();
// require variables
var keys = require('./keys.js');

var request = require('request');

var twitter = require('twitter');

var spotify = require('node-spotify-api');

var request = require("request");

var fs = require('fs');



var action = process.argv[2];
var value = process.argv[3];



switch (action, value) {
    case "my-tweets":
        twatter();
        break;
    case "spotify-this-song":
        song();
        break;
    case "movie-this":
        film();
        break;
    case "do-what-it-says":
        text();
        break;
    default:
        "random.txt!"
}



// make it so the app can take the following commands * `my-tweets` `spotify-this-song` `movie-this` `do-what-it-says`
//node liri.js my-tweets This will show your last 20 tweets and when they were created at in your terminal/bash window.
//node liri.js spotify-this-song '<song name here>' This will show the following information about the song in your terminal/bash window
//Artist(s)
//The song's name
//A preview link of the song from Spotify
//The album that the song is from
function twatter() {
    var client = new Twitter(keys.twitter);

    client.get('statuses/user_timeline', function(error, tweets, response) {
        if(error) throw error;
        
        for (var i =0; i < tweets.length;i++)
        var recent = "Tweet " + (i+1) + ": " + '\n' + tweets[i].text;

        console.log("my sweeet ass tweets yo" + recent)
        console.log("Tweeted at:  " + tweets[i].created_at);
        console.log("");

        
      });

}





//If no song is provided then your program will default to "The Sign" by Ace of Base.
//You will utilize the node-spotify-api package in order to retrieve song information from the Spotify API.
//Like the Twitter API, the Spotify API requires you sign up as a developer to generate the necessary credentials. You can follow these steps in order to generate a client id and client secret:
//Step One: Visit https://developer.spotify.com/my-applications/#!/
//Step Two: Either login to your existing Spotify account or create a new one (a free account is fine) and log in.
//Step Three: Once logged in, navigate to https://developer.spotify.com/my-applications/#!/applications/create to register a new application to be used with the Spotify API. You can fill in whatever you'd like for these fields. When finished, click the "complete" button.
//Step Four: On the next screen, scroll down to where you see your client id and client secret. Copy these values down somewhere, you'll need them to use the Spotify API and the node-spotify-api package.
function song(song) {
    var spotify = new Spotify(keys.spotify);
    spotify.search({ type: 'track', query: 'All the Small Things' }, function(err, data) {
        if (err) {
          return console.log('Error occurred: ' + err);
        }
       
      console.log(data); 
      console.log("artists" + data.artist);
      console.log("artists" + data.artist);
      console.log("artists" + data.artist);
      });


}

// node liri.js movie-this '<movie name here>'
// Title of the movie.
//* Year the movie came out.
//* IMDB Rating of the movie.
//* Rotten Tomatoes Rating of the movie.
//* Country where the movie was produced.
//* Language of the movie.
//* Plot of the movie.
//* Actors in the movie
//If the user doesn't type a movie in, the program will output data for the movie 'Mr. Nobody.'You'll use the request package to retrieve data from the OMDB API. Like all of the in-class activities, the OMDB API requires an API key. You may use trilogy

function film(movie) {
    
var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy";

    request(queryUrl, function(error, response, body) {

        // If the request is successful
        if (!error && response.statusCode === 200) {
      
          // Parse the body of the site and recover just the imdbRating
          // (Note: The syntax below for parsing isn't obvious. Just spend a few moments dissecting it).
          console.log("Release Year: " + JSON.parse(body).Title);
          console.log("Release Year: " + JSON.parse(body).Year);
          console.log("Release Year: " + JSON.parse(body).imdbRating);
          // figure out how to get parameter to filter out rotten tomatoes rating
         console.log("Release Year: " + JSON.parse(body).body.tomatoRating);
          console.log("Release Year: " + JSON.parse(body).Country);
          console.log("Release Year: " + JSON.parse(body).Language);
          console.log("Release Year: " + JSON.parse(body).Plot);

          console.log("Release Year: " + JSON.parse(body).Actors);
        }
      });
      

    }

    function text(){
        var spotify = new Spotify(keys.spotify);
        fs.readFile('random.txt', "utf8", function(error, data){
          var txt = data.split(',');
      
          song(txt[1]);
        });
      }

//node liri.js do-what-it-says Using the fs Node package, LIRI will take the text inside of random.txt and then use it to call one of LIRI's commands.
//It should run spotify-this-song for "I Want it That Way," as follows the text in random.txt.
//Feel free to change the text in that document to test out the feature for other commands.






