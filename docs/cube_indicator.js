define(function(require, exports, module) {

var faces = [];

function getMinimumCostElement(arr) {
	if(arr.length===0) return;
	var best = arr[0];
	for(var i=1; i<arr.length; ++i) {
		if(arr[i].cost<best.cost) best = arr[i];
	}
	return best;
}

function updateFaces(result) {
	if(result.faceTriples.length) {
		var t = getMinimumCostElement(result.faceTriples);
		faces = [t.face1, t.face2, t.face3];
	} else if(result.facePairs.length) {
		var t = getMinimumCostElement(result.facePairs);
		faces = [t.face1, t.face2];
	} else if(result.faces.length) {
		var t = getMinimumCostElement(result.faces);
		faces = [t];
	} else {
		faces = [];
	}
}

function drawFaces(canvas, scaleFactor) {
	var ctx = canvas.getContext('2d');
	for(var i=0; i<faces.length; ++i) {
		var x = [];
		var y = [];
		var quad = faces[i].quadrilateral;
		for(var j=0; j<quad.x.length; ++j) {
			x.push(quad.x[j]*scaleFactor);
			y.push(quad.y[j]*scaleFactor);
		}
		drawPolygon(ctx, {x:x, y:y});
	}
}

function drawPolygon(ctx, polygon, strokeStyle, fillStyle, lineWidth) {
	if(polygon.x.length===0) return;
	ctx.lineWidth = lineWidth ? lineWidth : 3;
	ctx.strokeStyle = strokeStyle ? strokeStyle : 'rgb(128,255,0)';
	ctx.fillStyle = fillStyle ? fillStyle : 'rgba(128,255,0,.5)';
	
	var x = polygon.x;
	var y = polygon.y;
	
	ctx.beginPath();
	ctx.moveTo(x[0], y[0]);
	for(var j=1; j<x.length; ++j) ctx.lineTo(x[j], y[j]);
	ctx.closePath();
	ctx.fill();
	ctx.stroke();			
}


exports.update = updateFaces;
exports.draw = drawFaces;

});