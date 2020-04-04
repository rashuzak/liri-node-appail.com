//return on dotenv to load up environment variables from .env file
require("dotenv").config();

// used to access  keys information
var keys = require("./keys.js");

//loads fs npm package for reading and writing packages
var fs = require("fs");

//
var Spotify = require("spotify-api");
var axios = require("axios");
var moment = require("moment");

//argv[2] chooses users actions; argv[3] is input parameter, ie; movie title
// process.argv will print out any command line arguments
var userCommand = process.argv[2];
//concatenate multiple words in 2nd user argument
var userSearch = process.argv.slice(3).join(" ");


function nodeLiri(userCommand, userSearch){
   switch (userCommand) {
	   case "concert-this":
		   concertThis();
		   break;	
	   case "spotify-this-song":
		   spotifyThisSong();
		   break;
	   case "movie-this":
		   movieThis();
		   break;
	   case "do-what-it-says":
		   doWhatItSays(userSearch);
		   break;

	   default:
		  console.log("Please enter a command");
    }
};

// `concert-this`node liri.js concert-this <artist/band name here>
//This will search the Bands in Town Artist Events API 
//(`"https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp"`) 

function concertThis(artist) {
    var artist = userSearch;
    var bandURL = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp";
	if (!artist){
		console.log("Please enter a Band");
	}
	

   axios.get(bandURL).then(
   function (response) {
	   //Render the following information about each event to the terminal:
	   console.log("---------------------------------------------------------------------------\n");
       console.log("* Name of the venue: " + response.data[0].venue.name + "\n");
       console.log("* Venue location: " + response.data[0].venue.city + "\n");
	   console.log("* Date of the Event: " + moment(response.data[0].datatime).format('MM/DD/YYYY, h:mm A') + "\n");
	   console.log("---------------------------------------------------------------------------\n");
	   
	   //var logArtist = "==== Artist Log ===" + "\nBand " + data.tracks.items[0].artists[i].name

		/*fs.appendFile("log.txt", logArtist, function (error) {
		if (error){
			console.log("error");
		}*/
    });

};

// `spotify-this-song` node liri.js spotify-this-song '<song name here>'`
  
function spotifyThisSong(song) {
	//Gets the Spotify Keys
	var spotify = new Spotify(keys.spotify);
	var song = userSearch;

	//If no song is provided then your program will default to "The Sign" by Ace of Base.  
	if(!song) {
		song = "The Sign Ace of Base";
	}

	// Spotify API request (if an object is returned, output the first search result's artist(s), song, preview link, and album)
	spotify.search({ type: 'track', query: song }, function(error, data) {
	    if(error) { 
	        console.log('Error occurred: ' + error);
		} 
		console.log("---------------------------------------------------------------------------\n");
		console.log("* Artist(s):  " + data.tracks.items[0].artists[0].name);	
		console.log("* The song's name:  " + data.tracks.items[0].name);
		console.log("* A preview link of the song from Spotify:  " + data.tracks.items[0].preview_url);
		console.log("* The album that the song is from:  " + data.tracks.items[0].album.name);
		console.log("---------------------------------------------------------------------------\n");
		
		//var logSong = "==== Song Log ===" + "\nArtist " + data.tracks.items[0].artists[i].name

		/*fs.appendFile("log.txt", logSong, function (error) {
		if (error){
			console.log("error");
		}*/
	 
	 		
	});
}


// `movie-this` node liri.js movie-this '<movie name here>'`
function movieThis(movie) {
	var movie = userSearch;
	//If the user doesn't type a movie in, the program will output data for the movie 'Mr. Nobody'.
	if (!movie){
		 movie = "Mr Nobody";
		 console.log("If you haven't watched 'Mr. Nobody,' then you should: <http://www.imdb.com/title/tt0485947/>");
		 console.log("It's on Netflix!");
	}
	
    var movieURL = "http://www.omdbapi.com/?t=" + movie + "&y=&plot=short&apikey=trilogy";

   //You'll use the `axios` package to retrieve data from the OMDB API. Like all of the in-class activities, the OMDB API requires an API key. You may use `trilogy`.
    axios.get(movieURL).then(
    function (response) {
		//This will output the following information to the terminal/bash window:
		console.log("---------------------------------------------------------------------------\n");
	    console.log("* Title of the movie:  " + response.data.Title + "/n");  
	    console.log("* Year the movie came out:  " + response.data.Year + "/n");
		console.log("* IMDB Rating of the movie:  " + response.data.imdbRating + "/n");
		console.log("* Rotten Tomatoes Rating of the movie:  " + response.data.Ratings[1].value + "/n");
	    console.log("* Country produced:  " + response.data.Country + "/n");
	    console.log("* Language of the movie:  " + response.data.Language + "/n");
	    console.log("* Plot of the movie:  " + response.data.Plot + "/n");
		console.log("* Actors in the movie:  " + response.data.Actors + "/n");
		console.log("---------------------------------------------------------------------------\n");
		

	    //var logMovie = "==== Movie Log ===" + "\nArtist " + data.tracks.items[0].artists[i].name

		/*fs.appendFile("log.txt", logMovie, function (error) {
		if (error){
			console.log("error");
		}*/
	  
	});
}



// `do-what-it-says``node liri.js do-what-it-says`
function doWhatItSays() {
    //Using the `fs` Node package, LIRI will take the text inside of random.txt and then use it to call one of LIRI's commands.
	fs.readFile("random.txt", "utf-8", function(error, data) {
		if (error){
			return console.log(error);
		} else {
		// It should run `spotify-this-song` for "I Want it That Way," as follows the text in `random.txt`.
		//Edit the text in random.txt to test out the feature for movie-this and concert-this.
		// If there is a comma, then we will split the string from file in order to differentiate between the command and query
			console.log(data);
			
			var randomData = data.split(",");
			nodeLiri(randomData[0].randomData[1]);
		}
	});
		
};	
/*### BONUS

* In addition to logging the data to your terminal/bash window, output the data to a .txt file called `log.txt`.

* Make sure you append each command you run to the `log.txt` file. 

* Do not overwrite your file each time you run a command.
function logData(data) {
	fs.appendFile("log.txt", data, function (error) {
		if (error){
			console.log("error");
		}
		
	});
	
}*/

nodeLiri(userCommand, userSearch);
