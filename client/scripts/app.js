// YOUR CODE HERE:
var app = {
  username: "shawndrost",
  text: "trololo",
  roomname: "4chan"
};

app.init = function() {
};

app.send = function(message) {
  $.ajax({
    url: "http://parse.sfm8.hackreactor.com/chatterbox/classes/messages",
    type: "POST",
    data: JSON.stringify(message),
    contentType: "application/json"
  });
};

app.fetch = function(message) {
  $.ajax({
    url: undefined,
    type: "GET",
    data: JSON.stringify(message),
    contentType: "application/json"
  });
};

app.clearMessages = function() {
  $('#chats').children().remove();
};
app.renderMessage = function(message) {
  $('#chats').append('<p class="username">'+message+'</p>');
};
app.renderRoom = function(roomName) {
  $('#roomSelect').append('<p class="room">'+roomName+'</p>');
};

app.handleUsernameClick = function() {
  if (!app.friend) {
    app.friend = [];//need to decid what to put in
  } else {
   // 
  }
};

$('.username').click(function(){
  app.handleUsernameClick();
});

//Make the button do something on click
// $("button").click(function() {
//   alert("Why did you click on me!");
// });
