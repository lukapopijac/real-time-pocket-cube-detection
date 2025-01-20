define(function(require, exports, module) {

var cubeIndicator = require('cube_indicator');
var controls = require('controls');

var worker = new Worker('w.js');
var imageDataStream;

function init() {
	worker.addEventListener('message', onMessage);
}

function onMessage(evt) {
	APP.canvasStream.getContext('2d').putImageData(imageDataStream, 0, 0);
	cubeIndicator.update(evt.data);
	cubeIndicator.draw(APP.canvasStream, APP.canvasStream.width/256);
	controls.updateFrameRateInfo(evt.data.time, APP.canvasStream);
	if(!APP.stream.ended) sendImageDataToWorker();
}

function sendImageDataToWorker() {
	imageDataStream = imageDataFromVideo(APP.video, 
	                      APP.canvasStream.width, APP.canvasStream.height);
	var imageDataDebug = imageDataFromVideo(APP.video, 256, 192);
	worker.postMessage({imageData: imageDataDebug});
}

function imageDataFromVideo(video, width, height) {
	if(!width) width = video.width;
	if(!height) height = video.height;
	var canvas = document.createElement('canvas');
	canvas.width = width;
	canvas.height = height;
	var ctx = canvas.getContext('2d');
	ctx.drawImage(video, 0, 0, width, height);
	var imageData = ctx.getImageData(0, 0, width, height);
	return imageData;
}

function setSrc(src) {
	APP.video.srcObject = src;
}

exports.init = init;
exports.setSrc = setSrc;
exports.start = function() {
	APP.video.play();
	sendImageDataToWorker();
};

});