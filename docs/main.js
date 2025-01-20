define(function(require, exports, module) {

var controls = require('controls');
var workerMaster = require('worker_master');

function APP_init() {
	window.APP = {
		video: document.getElementById('video'),
		canvasStream: document.getElementById('canvas_stream'),
		stream: null
	};
}

function main() {
	APP_init();
	workerMaster.init();
	
	var videoObj = {video: true};
	var errorCallback = function(error) {
		console.log('Video capture error: ', error.code); 
	};
	var successCallback = function(stream) {
		APP.stream = stream;
		workerMaster.setSrc(stream);
		setTimeout(workerMaster.start, 1000);
	};
	
	// initialize getUserMedia
	navigator.getUserMedia = navigator.getUserMedia || 
		navigator.webkitGetUserMedia || 
		navigator.mozGetUserMedia;
	navigator.getUserMedia(videoObj, successCallback, errorCallback);
	
}

main();

});
