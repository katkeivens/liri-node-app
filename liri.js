//liri takes the following commands
//my-tweets
//spotify-this-song
//movie-this
//do-what-it-says

const dotenv = require("dotenv").config();

//file system
const fs = require("fs")

//programs needed to run file
const keys = require("./keys.js");
// const spotify = new Spotify(keys.spotify);
const twitter = require("twitter");
// const request = require('request');


action();

//switch function to determine what action to take
function action(doSomething, argument) {

	argument = process.argv.slice(2);

	switch (doSomething) {
		case "my-tweets":
		myTweets();
		break;

		// case "spotify-this-song":
		// break;

		// case "movie-this":
		// break;

		// case "do-what-it-says":
		// break;
	}
}

function myTweets () {
	var client = new twitter(keys.exports.twitter);

	const searchParams = {screen_name: 'katkeivens', count: 20}

	client.get('statuses/user_timeline', searchParams, function(error, tweets, response) {
		if (!err) {
			console.log(tweets)
			// var tweetsArray = [];
			// tweetsArray.forEach(function(tweets) {
			// 	tweetsArray.push({
	  //           'created at: ' : tweets[i].created_at,
	  //           'Tweets: ' : tweets[i].text,
	 	// 		});
 			// })
		}
		// console.log(tweetsArray);
	});
}





// function saveToLog(input) {
// 	fs.appendFile("log.txt", '\r\n\r\n');

// 	fs.appendFile("log.txt", JSON.stringify(input), function(err) {
// 		if (err) {
// 			return console.log(err);
// 		}

// 		console.log("log.txt has been updated.");
// 	})
// }