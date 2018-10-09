require("dotenv").config();

var Spotify = require("node-spotify-api");

var keys = require("./keys.js");

var spotify = new Spotify(keys.spotify);

var request = require("request");

var moment = require("moment");
moment().format();



var command = process.argv[2];


if (command === "concert-this") {
    
    var artist = process.argv[3];

    console.log("Command: ", command, ", Artist Name: ", artist);

} else if (command === "spotify-this-song") {
    var song = process.argv[3];

    if (process.argv[3] !== 'undefined') {
        song = "The Sign";
    }

    spotify.search({type: "track", query: song}, function(err, data) {
        if (err) {
            return console.log("Error occured: " + err);
        } 
        console.log(data);
        console.log("Command: ", command, ", Song Name: ", song);
        console.log("Artist: " + data.artist);
        console.log("Song Name: " + data);
        console.log("Preview Link: " + data.tracks.href);
        console.log("Album: " + data.album);
    });


} else if (command === "movie-this") {

    var movie = process.argv[3];

    if (process.argv[3] !== 'undefined') {
        movie = "Mr. Nobody";
    }

    request("http://www.omdbapi.com/?t=" + movie + "&y=&plot=short&apikey=trilogy", function(error, response, body) {

      if (!error && response.statusCode === 200) {

        // Then we print out the imdbRating
        console.log("Title: " + JSON.parse(body).Title);
        console.log("Year Released: " + JSON.parse(body).Year);
        console.log("IMDB Rating: " + JSON.parse(body).imdbRating);
        console.log("Rotten Tomatoes Rating: " + JSON.parse(body).Ratings[1].Value);
        console.log("Country Produced: " + JSON.parse(body).Country);
        console.log("Language: " + JSON.parse(body).Language);
        console.log("Plot: " + JSON.parse(body).Plot);
        console.log("Actors: " + JSON.parse(body).Actors);
  }
    });

} else if (command === "do-what-it-says") {
    
    
    console.log("Command: ", command);

} else {
    
    console.log("Command Error");
}