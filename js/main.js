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
}

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

var audio = new Audio(),
    i = 0;
var playlist = new Array("Magnetic Man - I Need Air (edit).mp3", "MachinimaSound.com_-_Dance_of_the_Pixies.mp3", "Machinimasound.com_-_Remember_the_Dreams.mp3", "Machinimasound.com_-_September_Sky.mp3", "MachinimaSound.com_-_Shadows_of_the_Mind.mp3");

audio.addEventListener('ended', function () {
    i = ++i < playlist.length ? i : 0;
    audio.src = "./music/" + playlist[i];
    audio.play();
}, true);
audio.volume = 0.7;
audio.loop = false;
audio.src = "./music/" + playlist[getRandomInt(0, playlist.length-1)];
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
	$("#particles-js").fadeIn(150).fadeOut(150);
}
function setupDrawingCanvas() {
	canvas = document.createElement('canvas');
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;
	document.body.appendChild(canvas);
	canvasContext = canvas.getContext('2d');
	var grd=canvasContext.createLinearGradient(0,0,canvas.width,canvas.height);
	grd.addColorStop(0,"#66ffff");
	grd.addColorStop(1,"#4dff4d");
	canvasContext.fillStyle = grd;
}
