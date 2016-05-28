var messageLength = 0;
var message = 'Sorry, You ventured too far into the wilderness...';
var div = document.getElementById("message");

function type() {
  div.innerHTML = (message.substr(0, messageLength++));
  if (messageLength < message.length + 1) {
    setTimeout('type()', 50);
  }
}
type();

var cursor = document.getElementById("cursor");
var textHidden = true;
setInterval(function() {
  if (textHidden) {
    cursor.style.visibility = 'visible';
  } else {
    cursor.style.visibility = 'hidden';
  }
  textHidden = !textHidden;
}, 300);
