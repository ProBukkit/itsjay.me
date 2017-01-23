/**
Copyright (c) 2016 Jay B
Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 **/

var analyser, canvas, canvasContext;

window.onload = function() {
	setupWebAudio();
  setupDrawingCanvas();
	draw();
  window.addEventListener('resize', resizeCanvas, false);
}

var audio = new Audio();
audio.volume = 0.1;
audio.loop = true;
audio.src = "https://itsjay.me/music/Alan%20Walker%20-%20Fade.mp3";
audio.play();
function setupWebAudio() {
	var audioContext = new AudioContext() || new webkitAudioContext()();
	analyser = audioContext.createAnalyser();
	var source = audioContext.createMediaElementSource(audio);
	source.connect(analyser);
	analyser.connect(audioContext.destination);
	audio.play();
}

function draw() {
  requestAnimationFrame(draw);
	var freqByteData = new Uint8Array(analyser.frequencyBinCount);
	analyser.getByteFrequencyData(freqByteData);
	canvasContext.clearRect(0, 0, canvas.width, canvas.height);
	for (var i = 0; i < freqByteData.length; i++) {
		canvasContext.fillRect(i*3, canvas.height - freqByteData[i]*canvas.height/250, 1, canvas.height);
	}
}
function setupDrawingCanvas() {
	canvas = document.getElementById("featured-canvas");
	canvas.width = $("#featured").width();
	canvasContext = canvas.getContext('2d');
	var grd=canvasContext.createLinearGradient(0,0,canvas.width,canvas.height);
	grd.addColorStop(0,"#FF0000");
	grd.addColorStop(0.15,"#FFFF00")
	grd.addColorStop(0.30,"#00FF00")
	grd.addColorStop(0.50,"#00FFFF")
	grd.addColorStop(0.65,"#0000FF")
	grd.addColorStop(0.80,"#FF00FF")
	grd.addColorStop(1,"#FF0000")
	canvasContext.fillStyle = grd;
}


function resizeCanvas() {
  	canvas.width = $("#featured").width();
    var grd=canvasContext.createLinearGradient(0,0,canvas.width,canvas.height);
  	grd.addColorStop(0,"#FF0000");
  	grd.addColorStop(0.15,"#FFFF00")
  	grd.addColorStop(0.30,"#00FF00")
  	grd.addColorStop(0.50,"#00FFFF")
  	grd.addColorStop(0.65,"#0000FF")
  	grd.addColorStop(0.80,"#FF00FF")
  	grd.addColorStop(1,"#FF0000")
  	canvasContext.fillStyle = grd;
}
