// Global Variables
var objsCreated;
var sceneName;
var numObjs;
var objs;
var corrAns;
var playSound;
var soundFile;


// Import the database
var scenes = require('../js/db.js');

function getGlobalVars() {
	objsCreated = parseInt(localStorage.getItem("objsCreated"));
	sceneName = localStorage.getItem("sceneName");
	corrAns = localStorage.getItem("corrAns");
	numObjs = parseInt(localStorage.getItem("numObjs"));
	objects = JSON.parse(localStorage.getItem("objects"));
	playSound = localStorage.getItem("boolSound");
	soundFile = localStorage.getItem("soundFile");

}


// This function is called once for every object that
// needs to be part of the scene. It displays the 
// form used to determine the parameters for the object.
function addObj() {
	// objNum
	var objNum = objsCreated + 1;

	// objType
	var objType = $('#objType').val();

	// custom motion vars
	var customMot = $('#customMot').val();
    var boolMot = (customMot === "true"); //required to parse the string value customMot to boolean

	var customFile = $('#customFile').val();
	if (customFile < 1){
		customFile = "";
	}else{
        customFile = customFile + '.cus';
	}

	var customDur = parseFloat($('#customDur').val());

    // objScale
	var objScaleX = parseFloat($('#objScaleX').val());
	var objScaleY = parseFloat($('#objScaleY').val());
	var objScaleZ = parseFloat($('#objScaleZ').val());

    // objectRotation
    var objRotX = parseFloat($('#objRotX').val());
    var objRotY = parseFloat($('#objRotY').val());
    var objRotZ = parseFloat($('#objRotZ').val());

    // startPos
	var objStartX = parseFloat($('#objStartX').val());
	var objStartY = parseFloat($('#objStartY').val());
	var objStartZ = parseFloat($('#objStartZ').val());

	// endPos
	var objEndX = parseFloat($('#objEndX').val());
	var objEndY = parseFloat($('#objEndY').val());
	var objEndZ = parseFloat($('#objEndZ').val());

	// velocity
	var velocity = parseFloat($('#velocity').val());

	// timeVisible
	var timeVisible = parseFloat($('#timeVisible').val());

    // objectRotation
    var objRotSpeedX = parseFloat($('#objRotSpeedX').val());
    var objRotSpeedY = parseFloat($('#objRotSpeedY').val());
    var objRotSpeedZ = parseFloat($('#objRotSpeedZ').val());

    // offset vars
    var offsetX = $('#offsetX').val();
    var offsetY = $('#offsetY').val();
    var offsetZ = $('#offsetZ').val();

    var booloffsetX = (offsetX === "true"); //required to parse the string value offsetX to boolean
    var booloffsetY = (offsetY === "true"); //required to parse the string value offsetX to boolean
    var booloffsetZ = (offsetZ === "true"); //required to parse the string value offsetX to boolean

	var newObj = {
		objNum: objNum,
		objType: objType,
		customMot: boolMot,
		customFile: customFile,
		customDur: customDur,
		objScale: [objScaleX, objScaleY, objScaleZ],
		objRot: [objRotX, objRotY, objRotZ],
		startPos: [objStartX, objStartY, objStartZ],
		endPos: [objEndX, objEndY, objEndZ],
		velocity: velocity,
		timeVisible: timeVisible,
        rotationSpeedX: objRotSpeedX,
        rotationSpeedY: objRotSpeedY,
        rotationSpeedZ: objRotSpeedZ,
		offsetX: booloffsetX,
		offsetY: booloffsetY,
		offsetZ: booloffsetZ
	};

	objsCreated += 1;
	objects.push(newObj);
	localStorage.setItem("objects", JSON.stringify(objects));
	localStorage.setItem("objsCreated", objsCreated.toString());

	var sceneNum = parseInt(localStorage.getItem("numScenes"));
	// alert('sceneNum is ' + sceneNum);
	// alert('pls ' + localStorage.getItem("sceneNum"));

	alert('boolSound is ' + playSound);
	alert('sound file is ' + soundFile);

	if (objsCreated === numObjs) {
		var newScene = {
			sceneNum: sceneNum,
			sceneName: sceneName,
			corrAns: corrAns,
			playSound: playSound,
            soundFile: soundFile,
			objects: objects
		};

		scenes.insert(newScene, function(err, doc) {
			console.log('Inserted', doc.name, 'with ID', doc._id);
		});
		window.location = "./new_scene_success.html"
	} else {
		window.location = "./create_scene.html";
	}
}


$(document).ready(function() {
	getGlobalVars();

	// Add tooltips
	$('[data-toggle="tooltip"]').tooltip({
		container: 'body'
	});	

	var objCreationHeader = $('#objCreationHeader');
	objCreationHeader.append('<h2>Object ' + (objsCreated + 1) + ' </h2>');
})