//liri takes the following commands
//my-tweets
//spotify-this-song
//movie-this
//do-what-it-says

const dotenv = require("dotenv").config();

//programs needed to run file
const keys = require("./keys.js");
const Spotify = require("node-spotify-api");
const Twitter = require("twitter");
const request = require('request');
const fs = require("fs")

//switch function to determine what action to take
function action() {
	const command = process.argv.slice(2)[0];
	const value = process.argv.slice(3);
	goLiri(command, value);
}

function goLiri(command, value) {
	switch (command) {
		case "my-tweets":
			myTweets();
			break;

		case "spotify-this-song":
			spotifyThisSong(value, function(result) { 
				console.log(result); 
			});
			break;

		case "movie-this":
			movieThis(value, function(result) { 
				console.log(result); 
			});
			break;

		case "do-what-it-says":
			var file = "random.txt";
			doWhatItSays(file);
			break;
	}	
}

function myTweets () {

	const client = new Twitter(keys.twitter);

	const searchParams = {screen_name: "katkeivens", count: 20};

	client.get("statuses/user_timeline/", searchParams, function(error, tweets, response) {
		if (!error) {
			var tweetsArray = [];
			tweets.forEach(function(tweet) {
				tweetsArray.push({
		            "created at: " : tweet.created_at,
		            "Tweets: " : tweet.text
	 			});
 			})
		}
		console.log(JSON.stringify(tweetsArray, undefined, 2));
	});
}

function spotifyThisSong (songName, callback) {
	const spotifyKey = new Spotify(keys.spotify);
	const songInfoArray =[];
	var song;

	if (songName.length === 0) {
		songInfoArray.push({
			"Artist: " : "Ace of Base",
			"Song Name: " : "The Sign",
			"Preview Link: " : "https://p.scdn.co/mp3-preview/4c463359f67dd3546db7294d236dd0ae991882ff?cid=c5606ca5ccec4f0faf7b7c9d1ab92776",
			"Album: " : "The Sign (US Album) [Remastered]",
		})
		callback(songInfoArray);
	} else {
		spotifyKey.search({ type: "track", query: songName}, function(error, response) {
			var songList = response.tracks.items;
			var i = 0;
			songList.forEach(function(song) {
				i++;
				//console.log(song);
				songInfoArray.push({
					"Artist: " : song.album.artists[0].name,
					"Song Name: " : song.name,
					"Preview Link: " : song.preview_url,
					"Album: " : song.album.name,
				})
				if (i === songList.length) {
					callback(songInfoArray);
				}

			})
		});
	};
	return songInfoArray;
}

function movieThis (movieName, callback) {
	if (movieName.length === 0) { movieName = 'Mr. Nobody' }
	var requestUrl = 'http://www.omdbapi.com/?apikey=38c934f1&t=' + movieName;
	request(requestUrl, function (error, response, body) {
		var result = JSON.parse(body);
		var movie = {
			"Title: " : result.Title,
			"Year: " : result.Year,
			"IMDB Rating: " : result.imdbRating,
			"Rotten Rating: " : result.Ratings[1].Value,
			"Country: " : result.Country,
			"Language: " : result.Language,
			"Plot: " : result.Plot,
			"Actors: " : result.Actors
		}
		callback(movie)
	});
}

function doWhatItSays (file) {
	var output;
	fs.readFile(file, 'utf8', function (err, data) {
		if (err) throw err;

		var string = data.split(',');
		var command = string[0];
		var value = string[1];

		goLiri(command, value);
	});
}


action();


// function saveToLog(input) {
// 	fs.appendFile("log.txt", '\r\n\r\n');

// 	fs.appendFile("log.txt", JSON.stringify(input), function(err) {
// 		if (err) {
// 			return console.log(err);
// 		}

// 		console.log("log.txt has been updated.");
// 	})
// }