var messageLength = 0
var message = 'Sorry, You ventured too far into the wilderness...'
var div = document.getElementById('message')

var count = 5
function countdown () {
  div.innerHTML = div.innerHTML.substr(0, div.innerHTML.length - 1) + count--
  if (count > 0) {
    window.setTimeout(countdown, 1000)
  } else {
    window.location = '/'
  }
}
function erase () {
  div.innerHTML = message.substr(0, messageLength--)
  if (messageLength + 1 > 0) {
    window.setTimeout(erase, 50)
  } else {
    message = 'Redirecting in  '
    type(false)
  }
}

function type (bool) {
  div.innerHTML = (message.substr(0, messageLength++))
  if (messageLength < message.length + 1) {
    window.setTimeout(type(bool), 50)
  } else {
    if (bool) {
      erase()
    } else {
      countdown()
    }
  }
}
type(true)

var cursor = document.getElementById('cursor')
var textHidden = true
setInterval(function () {
  if (textHidden) {
    cursor.style.visibility = 'visible'
  } else {
    cursor.style.visibility = 'hidden'
  }
  textHidden = !textHidden
}, 200)
