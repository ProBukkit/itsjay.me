let analyser, canvas, canvasContext
let musicStarted = false

const startMusic = function () {
  if (musicStarted) return
  musicStarted = true
  resizeCanvas()
  draw()
  window.addEventListener('resize', resizeCanvas, false)
  const audio = new window.Audio()
  var audioContext = new (window.AudioContext || window.webkitAudioContext)()
  analyser = audioContext.createAnalyser()
  var source = audioContext.createMediaElementSource(audio)
  source.connect(analyser)
  analyser.connect(audioContext.destination)

  let i = 0
  const playlist = ['Alan Walker - Fade.mp3', 'MachinimaSound.com_-_Dance_of_the_Pixies.mp3', 'Machinimasound.com_-_Remember_the_Dreams.mp3', 'Machinimasound.com_-_September_Sky.mp3', 'MachinimaSound.com_-_Shadows_of_the_Mind.mp3', 'Magnetic.Man.-.I.Need.Air.edit.mp3']

  audio.addEventListener('ended', function () {
    i = ++i < playlist.length ? i : 0
    audio.src = './assets/music/' + playlist[i]
    audio.play()
  }, true)
  audio.volume = 0.05
  audio.loop = false
  audio.src = './assets/music/' + playlist[getRandomInt(0, playlist.length - 1)]
  audio.play()
}

document.getElementById('music').onclick = startMusic

function resizeCanvas () {
  if (document.contains(canvas)) canvas.parentNode.removeChild(canvas)
  setupDrawingCanvas()
}

function getRandomInt (min, max) {
  return Math.floor(Math.random() * (max - min)) + min
}

function draw () {
  window.requestAnimationFrame(draw)
  var freqByteData = new Uint8Array(analyser.frequencyBinCount)
  analyser.getByteFrequencyData(freqByteData)
  canvasContext.clearRect(0, 0, canvas.width, canvas.height)
  let x = 0
  for (let i = 0; i < freqByteData.length; i++) {
    let barWidth = (canvas.width / analyser.frequencyBinCount * 2.5)
    canvasContext.fillRect(x, canvas.height - freqByteData[i] * 3, barWidth, canvas.height)
    x += barWidth + 1
  }
}
function setupDrawingCanvas () {
  canvas = document.createElement('canvas')
  canvas.width = window.innerWidth
  canvas.height = window.innerHeight
  document.body.appendChild(canvas)
  canvasContext = canvas.getContext('2d')
  var grd = canvasContext.createLinearGradient(0, 0, canvas.width, canvas.height)
  grd.addColorStop(0, '#FF0000')
  grd.addColorStop(0.15, '#FFFF00')
  grd.addColorStop(0.30, '#00FF00')
  grd.addColorStop(0.50, '#00FFFF')
  grd.addColorStop(0.65, '#0000FF')
  grd.addColorStop(0.80, '#FF00FF')
  grd.addColorStop(1, '#FF0000')
  canvasContext.fillStyle = grd
}

const termsOfService = () => {
  const termsDiv = document.getElementById('terms')
  termsDiv.style.height = '150'
  termsDiv.style.opacity = '1'
}

let initialHash = window.location.hash.substring(1)
if (initialHash === 'tos') {
  termsOfService()
}

const termsLink = document.getElementById('termslink')
termsLink.onmouseover = termsOfService

const termsOfServiceHide = () => {
  if (initialHash === 'tos') return
  const termsDiv = document.getElementById('terms')
  termsDiv.style.height = '0'
  termsDiv.style.opacity = '0'
}

termsLink.onmouseout = termsOfServiceHide
