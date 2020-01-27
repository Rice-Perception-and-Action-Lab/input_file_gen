// Import the database
var scenes = require('../js/db.js');

function initScene() {
	var sceneName = $('#sceneName').val();
	var numObjs = $('#numObjs').val();
	var corrAns = $('#corrAns').val();

    //custom sound vars
    var customSound = $('#customSound').val();
    var boolSound = (customSound === "true"); //required to parse the string value customSound to boolean

    var soundFile = $('#soundFile').val();
    if (soundFile < 1){
        soundFile = "";
    }else{
        soundFile = soundFile + '.txt';
    }


    // Set the variables in local storage so they can be
	// accessed from different pages
	localStorage.setItem("sceneName", sceneName);
	localStorage.setItem("corrAns", corrAns);
	localStorage.setItem("numObjs", numObjs);
	localStorage.setItem("objsCreated", 0);
	localStorage.setItem("objects", "[]");
    localStorage.setItem("boolSound", boolSound);
    localStorage.setItem("soundFile", soundFile);

	// var numScenes = localStorage.getItem("numScenes");
	// if (!numScenes) {
	// 	localStorage.setItem("numScenes", 0);
	// }

	scenes.count({}, function(err, num) {
		localStorage.setItem("numScenes", num);
	})

	// set the current scene number based on the number of docs in the db

	window.location = "../html/create_scene.html";
}

$(document).ready(function() {
	// Add tooltips
	$('[data-toggle="tooltip"]').tooltip({
		container: 'body'
	});
});