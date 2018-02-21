var friends = require("../data/friends.js");

module.exports = function (app){
	app.get("/api/friends", function(req, res){
		res.json(friends);
		
	});

	app.post("/api/friends", function(req, res){
		
		var bestMatches = {
			name: "",
			photo: "",
			friendDiff: 1000
		};

		console.log("req.body");

		// results of survey POST and parse
		var userInfo = req.body;
		var userScores = userInfo.scores;
		console.log("userScore");

		// difference calculation
		var difference = 0;

		// loop thru database for best match
		for (var i = 0; i<friends.length; i++) {
			console.log(friends[i]);
			difference = 0;

			// loop thru friends data base for all posibilities
			for (var j = 0; j<friends[i].scores[j]; j++){
				difference += Math.abs(parseInt(userScores[j])- parseInt(friends[i].scores[j]));

				//compaire for best match check all friends scores
				if (difference <= bestMatches.friendDiff){
					bestMatches.name = friends[i].name;
					bestMatches.photo = friends[i].photo;
					bestMatches.friendDiff = difference;

				}

			}
		}
		friends.push(userInfo);

		res.json(bestMatches);
		
	});

}