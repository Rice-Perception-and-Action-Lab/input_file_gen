function createConfig() {
	// subjNum
	var subjNum = parseInt($('#subjNum').val());

	// subjSex
	var subjSex = parseInt($('#subjSex').val());

    // session
    var session = parseInt($('#session').val());

    // group
    var group = parseInt($('#group').val());

	// dataFile
	var dataFile = $('#dataFile').val() + '.json';
	var trialFile = '~\\..\\Assets\\Trials\\' + dataFile;

	// cameraLock
    var cameraLock = $('#cameraLock').val();
    var boolCam = (cameraLock === "true"); //required to parse the string value cameraLock to boolean

	// trackHead
    var trackHead = $('#trackHead').val();
    var boolTrackHead = (trackHead === "true"); //required to parse the string value trackHead to boolean

    // trackController
    var trackController = $('#trackController').val();
    var boolTrackController = (trackController === "true"); //required to parse the string value trackController to boolean

	// showFeedback
    var showFeedback = $('#showFeedback').val();
    var boolShowFeedback = (showFeedback === "true"); //required to parse the string value showFeedback to boolean

     // feedbackType
    var feedbackType = parseInt($('#feedbackType').val());

	// feedbackColor
	var feedbackColor = $('#feedbackColor').val().toLowerCase();

	// feedbackSize
	var feedbackSize = parseFloat($('#feedbackSize').val());

	// feedbackPos
	var canvasPosX = parseFloat($('#feedbackX').val());
	var canvasPosY = parseFloat($('#feedbackY').val());
	var canvasPosZ = parseFloat($('#feedbackZ').val());

    // confidence
    var confidence = $('#confidence').val();
    var boolConfidence = (confidence === "true"); //required to parse the string value confidence to boolean

    // ground
    var ground = $('#ground').val();
    var boolGround = (ground === "true"); //required to parse the string value ground to boolean

    // road
    var road = $('#road').val();
    var boolRoad = (road === "true"); //required to parse the string value road to boolean

    // roadPos
    var roadPosX = parseFloat($('#roadPosX').val());
    var roadPosY = parseFloat($('#roadPosY').val());
    var roadPosZ = parseFloat($('#roadPosZ').val());

    // pressHold
    var pressHold = $('#pressHold').val();
    var boolPressHold = (pressHold === "true"); //required to parse the string value confidence to boolean

    // debugging
    var debugging = $('#debugging').val();
    var boolDebugging = (debugging === "true"); //required to parse the string value ground to boolean


	// Create a dictionary to hold the config data
	var data = {
		subjNum: subjNum,
		subjSex: subjSex,
		session: session,
		group: group,
		trialFile: trialFile,
		cameraLock: boolCam,
		trackHeadPos: boolTrackHead,
		trackControllerPos: boolTrackController,
		showFeedback: boolShowFeedback,
		feedbackType: feedbackType,
		feedbackColor: feedbackColor,
		feedbackSize: feedbackSize,
		feedbackPos: [canvasPosX, canvasPosY, canvasPosZ],
		collectConfidence: boolConfidence,
		ground: boolGround,
		road: boolRoad,
		roadPos: [roadPosX, roadPosY, roadPosZ],
		pressHold: boolPressHold,
		debugging: boolDebugging
	};

	// Convert the data to JSON
	var jsonData = JSON.stringify(data, null, 4);

	// Write the JSON data to a file
	writeJsonData(jsonData);

	// Point the window to a success page
	window.location = "../html/config_success.html"
}


function writeJsonData(jsonData) {
	// Require the file system library functions
	var fs = require('fs');

	// Get a remote reference to the application to find the filepath
	const remote = require('electron').remote;
	const app = remote.app;
	var path = require('path');

	// Save the file as "config.json" in the application's user data folder 
	var filepath = path.join(app.getPath('home'), "config.json");

	fs.writeFileSync(filepath, jsonData, function(err) {
		if (err) {
			console.log(err);
			alert(`ERROR: Could not save config.json file to ${filepath}`);
		}
	})
}

function displayConfigSuccessMsg() {
	const remote = require('electron').remote;
	const app = remote.app;		// we need a reference to the app to find its path
	var path = require('path');
	var filepath = path.join(app.getPath('home'), 'config.json');
	var successMsgDiv = $('#successMsg');
	var msg = 'You can find your new input file here:';
	successMsgDiv.append('<p>' + msg + '</p><p>' + filepath + '</p>');
}

$(document).ready(function() {
	// Add tooltips
	$('[data-toggle="tooltip"]').tooltip({
		container: 'body'
	});
});