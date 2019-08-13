var friends = require("../data/friends.js");
var path = require("path");
var fs = require("fs");

// ***** API ROUTES *****
module.exports = function(app){

	// ---- Get a json list of all available friends ----
	app.get("/api/friends", function(req, res) {
	  res.json(friends);
	});

	// ---- POST request used for survey ----
	app.post("/api/friends", function(req, res){
		console.log("this will do stuff");
		var friendInput = req.body; 
		res.json(true);
		console.log("\nName: " + friendInput.name + "\nPhoto: " +
			friendInput.photo + "\nScores: " + friendInput.answers);

		friendInput.answers = friendInput.answers.split(",");

		friends.push(friendInput);
		convertAnswers(friendInput);
		// console.log(friendInput.answers);

		compareFriends(friends, friendInput);

		// console.log(friendInput);
	});

}


function NewFriend(name, photo, answers) {
	this.name = name;
	this.photo = photo;
	this.answers = answers;
}


function convertAnswers(currentFriend) {
	var current = currentFriend;
	// console.log(current);

	var curAnswers = current.answers; 

	
	for (i=0; i<curAnswers.length; i++) {
		curAnswers[i] = parseInt(curAnswers[i]);
	}

} 


function compareFriends(allFriends, currentFriend) {
	var curFriend = currentFriend.answers;
	var matchFriend;
	var matchScores = [];
	var matchScore = 0;
	var closestMatch;

	
	for (i=0; i<allFriends.length-1; i++) {
		matchFriend = allFriends[i].answers;
		// console.log(matchFriend);

		
		for (j=0; j<matchFriend.length; j++) {
			
			var qScore = Math.abs(curFriend[j] - matchFriend[j]);
			matchScore += qScore;
		}

		
		matchScores.push(matchScore);
		matchScore = 0;
	} 
	// console.log(matchScores)


	var lowestScore = Math.min(...matchScores);


	
	var matchIndex = matchScores.indexOf(lowestScore);
	// console.log(matchIndex);
	
	var bestFriend = allFriends[matchIndex];


	currentFriend.bestie = bestFriend;
	// console.log(currentFriend);
}