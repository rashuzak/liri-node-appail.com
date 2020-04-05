# LIRI Bot

 Overview:

 LIRI is like iPhone's SIRI.  LIRI is a _Language_ Interpretation and Recognition Interface. LIRI is a command line node app that takes in parameters and gives you back data.



1. LIRI will search Spotify for songs, Bands in Town for concerts, and OMDB for movies.


2. Data that will power this app,   Node packages used: 
 

   * [Node-Spotify-API](https://www.npmjs.com/package/node-spotify-api)

   * [Axios](https://www.npmjs.com/package/axios)

     * Used Axios to grab data from the [OMDB API](http://www.omdbapi.com) and the [Bands In Town API](http://www.artists.bandsintown.com/bandsintown-api)

   * [Moment](https://www.npmjs.com/package/moment)

   * [DotEnv](https://www.npmjs.com/package/dotenv)




3. Navigated to the root of the project and run `npm init -y` &mdash; this  initialize a `package.json` file for the project to work. 



4. A `.gitignore` file is created to set what are known as environment variables to the global  object in node. These are values that are meant to be specific to the computer that node is running on, and since we are gitignoring this file, they won't be pushed to github &mdash; keeping our API key information private.
 

5. liri.js will take in one of the following commands:

   * `concert-this`

   * `spotify-this-song`

   * `movie-this`

   * `do-what-it-says`




 Commands:

1. concert-this <artist/bandname> 

   * This will search the Bands in Town Artist Events API  for an artist and render the following information about each event to the terminal:

     * Name of the venue

     * Venue location

     * Date of the Event (use moment to format this as "MM/DD/YYYY")

   
2. spotify-this-song <song name>

   * This will show the following information about the song in the terminal/bash window

     * Artist(s)

     * The song's name

     * A preview link of the song from Spotify

     * The album that the song is from

   * If no song is provided then the program will default to "The Sign" by Ace of Base.

   * Utilized the [node-spotify-api](https://www.npmjs.com/package/node-spotify-api) package to retrieve song information from the Spotify API.


3.  movie-this <movie name>

   * This will output the following information to the terminal/bash window:

     ```
       * Title of the movie.
       * Year the movie came out.
       * IMDB Rating of the movie.
       * Rotten Tomatoes Rating of the movie.
       * Country where the movie was produced.
       * Language of the movie.
       * Plot of the movie.
       * Actors in the movie.
     ```

   * If the user doesn't type a movie in, the program will output data for the movie 'Mr. Nobody.'

    
   * Used the `axios` package to retrieve data from the OMDB API. 


4.  do-what-it-says

   * Using the `fs` Node package, LIRI takes the text inside of random.txt and then use it to call one of LIRI's commands.

     * It runs `spotify-this-song` for "I Want it That Way," 

    

*  Date is logged  to a .txt file called `log.txt`.


*NOTE: To run this APP you will need to create .env file and get your own Spotify ID and Spotify Secret.

# Spotify API keys

SPOTIFY_ID=your-spotify-id
SPOTIFY_SECRET=your-spotify-secret


LINK: A video showing how this APP works: https://drive.google.com/file/d/1nn1UgECsc5RwizBn7-VRbuPcO8AX9Wbq/view?usp=sharing