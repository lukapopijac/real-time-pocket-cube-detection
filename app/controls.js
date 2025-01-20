define(function(require, exports, module) {

var updateFrameRateInfo = function() {
	var info_fps = document.getElementById('info_fps');
	var n = 8;
	var dts = new Int32Array(n);
	var sum = 0;
	var i = 0;
	return function(dt, canvas) {
		sum += dt - dts[i];
		dts[i++] = dt;
		if(i===n) i=0;
		info_fps.innerHTML = Math.round(1000*n/sum);
		var detectionTime = Math.round(sum/n);
		if(canvas) {
			var ctx = canvas.getContext('2d');
			ctx.fillStyle = 'rgba(0,0,0,.35)';
			ctx.fillRect(8,8,168,28);
			
			
			ctx.fillStyle = 'rgb(100,255,0)';
			ctx.font = '16px Arial';
			ctx.fillText('Detection time: ' + detectionTime + ' ms', 15, 28);
		}
	}
}();

exports.updateFrameRateInfo = updateFrameRateInfo;

});
