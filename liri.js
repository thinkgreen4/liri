require("dotenv").config();
// require variables
var keys = require('./keys.js');

var request = require('request');

var Twitter = require('twitter');

var Spotify = require('node-spotify-api');

var request = require("request");

var fs = require('fs');


console.log(process.argv);

 function getMovieName() {
     var movieName = ''
     for(var i = 3; i < process.argv.length; i++){
         console.log(process.argv[i]);
         movieName = movieName + process.argv[i] +''

     }
     console.log(movieName);
     return movieName
 }
 nodeArgv = process.argv;
var x = "";
//attaches multiple word arguments
for (var i=3; i<nodeArgv.length; i++){
  if(i>3 && i<nodeArgv.length){
    x = x + "+" + nodeArgv[i];
  } else{
    x = x + nodeArgv[i];
  }
}

var action = process.argv[2];
var value = process.argv[3];



switch (action) {
    case "my-tweets":
        twatter();
        console.log("tweets")
        break;
    case "spotify-this-song":
     if(x){
        track(x);   
     } else 
     {track("weston road flows");
    }
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
    var params = {screen_name: 'billy'};
    client.get('statuses/user_timeline', function(error, tweets, response) {
        if(error) throw error;
        
        for (var i =0; i < tweets.length;i++){
            var recent = "Tweet " + (i+1) + ": " + '\n' + tweets[i].text;

            console.log("my sweeet ass tweets yo" + recent)
            console.log("Tweeted at:  " + tweets[i].created_at);
            console.log("");
            // apend file to random.txt
            // fs.appendFile("random.txt","my sweeet ass tweets yo" + recent)
            // fs.appendFile("random.txt","Tweeted at:  " + tweets[i].created_at);
            // fs.appendFile("");
        }
        

        
      });

}





//If no song is provided then your program will default to "The Sign" by Ace of Base.
//You will utilize the node-spotify-api package in order to retrieve song information from the Spotify API.
//Like the Twitter API, the Spotify API requires you sign up as a developer to generate the necessary credentials. You can follow these steps in order to generate a client id and client secret:
//Step One: Visit https://developer.spotify.com/my-applications/#!/
//Step Two: Either login to your existing Spotify account or create a new one (a free account is fine) and log in.
//Step Three: Once logged in, navigate to https://developer.spotify.com/my-applications/#!/applications/create to register a new application to be used with the Spotify API. You can fill in whatever you'd like for these fields. When finished, click the "complete" button.
//Step Four: On the next screen, scroll down to where you see your client id and client secret. Copy these values down somewhere, you'll need them to use the Spotify API and the node-spotify-api package.
function track(song) {
    var spotify = new Spotify(keys.spotify);
    spotify.search({ type: 'track', query: song}, function(err, data) {
        if (!err) {
       
            var songData = data.tracks.items[0];
            //artist
            console.log("Artist: " + songData.artists[0].name);
            //song name
            console.log("Song: " + songData.name);
            // //spotify preview link
             console.log("Preview URL: " + songData.preview_url);
            // //album name
             console.log("Album: " + songData.album.name);
            console.log("-----------------------");

            //append file to random.txt
            // fs.appendFile('random.txt', songData.artists[0].name);
            // fs.appendFile('random.txt', songData.name);
            // fs.appendFile('random.txt', songData.preview_url);
            // fs.appendFile('random.txt', songData.album.name);
            // fs.appendFile('random.txt', "-----------------------");

          }
         else{
            return console.log('Error occurred: ' + err);
        }
       
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
    
var queryUrl = "http://www.omdbapi.com/?t=" + getMovieName() + "&y=&plot=short&apikey=trilogy";

    request(queryUrl, function(error, response, body) {

        //If the request is successful
        if (!error && response.statusCode === 200) {
      
         // Parse the body of the site and recover just the imdbRating
         // (Note: The syntax below for parsing isn't obvious. Just spend a few moments dissecting it).
          console.log("Title: " + JSON.parse(body).Title);
          console.log("Release Year: " + JSON.parse(body).Year);
          console.log("Rating: " + JSON.parse(body).imdbRating);
         // figure out how to get parameter to filter out rotten tomatoes rating
        
          console.log("Country: " + JSON.parse(body).Country);
          console.log("Language: " + JSON.parse(body).Language);
          console.log("Plot: " + JSON.parse(body).Plot);

          console.log("Actors: " + JSON.parse(body).Actors);

          // append file ro random.txt
        //   fs.appendFile("random.txt", "Title: " + JSON.parse(body).Title);
        //   fs.appendFile("random.txt","Release Year: " + JSON.parse(body).Year);
        //   fs.appendFile("random.txt","Rating: " + JSON.parse(body).imdbRating);
        //  // figure out how to get parameter to filter out rotten tomatoes rating
        
        //   fs.appendFile("random.txt","Country: " + JSON.parse(body).Country);
        //   fs.appendFile("random.txt","Language: " + JSON.parse(body).Language);
        //   fs.appendFile("random.txt","Plot: " + JSON.parse(body).Plot);

        //   fs.appendFile("random.txt","Actors: " + JSON.parse(body).Actors);
          
        }
      });
      

    }

    function text(){
        
            fs.readFile("random.txt", "utf8", function(error, data){
                if (error) {
                    return console.log(error);
                }
        
                var randomChoice = data.split(",");
                console.log(randomChoice);
                if(randomChoice[0] === "spotify-this-song") {
                    spotifyThis(randomChoice[1]);
                }
                
            })
        };
        

//node liri.js do-what-it-says Using the fs Node package, LIRI will take the text inside of random.txt and then use it to call one of LIRI's commands.
//It should run spotify-this-song for "I Want it That Way," as follows the text in random.txt.
//Feel free to change the text in that document to test out the feature for other commands.






