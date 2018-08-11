// YOUR CODE HERE:
//$(document).ready(function() {
var App = function(username, text, roomname) {
  this.username = username;
  this.text = text;
  this.roomname = roomname;
  this.server = 'http://parse.sfm8.hackreactor.com/chatterbox/classes/messages';
};

App.prototype.init = function() {
  $('.username').click(function() {
    app.handleUsernameClick();
  });
  $('#send .submit').submit(function(event) {
    app.handleSubmit();
  });
};

App.prototype.send = function(message) {
  $.ajax({
    url: 'http://parse.sfm8.hackreactor.com/chatterbox/classes/messages',
    type: 'POST',
    data: JSON.stringify(message),
    contentType: 'application/json'
  });
};

App.prototype.fetch = function() {
  return $.ajax({
    url: 'http://parse.sfm8.hackreactor.com/chatterbox/classes/messages',
    type: 'GET',
    // data: JSON.stringify(data),
    contentType: 'application/json'
  });
};

App.prototype.clearMessages = function() {
  $('#chats').children().remove();
};
App.prototype.renderMessage = function(message) {
  $('#chats').append('<p class="username">' + message.text + '</p>');
};
App.prototype.renderRoom = function(roomName) {
  $('#roomSelect').append('<p class="room">' + roomName + '</p>');
};

App.prototype.handleUsernameClick = function() {
  // this adds a friend
};

App.prototype.handleSubmit = function() {
  // this sends a messaged
};

//});0
var app = new App();
var fetchedMsg = app.fetch();


//ultiemately we want to display texts into body of the HTML
//toggle for each of the different chatrooms
//be able to add friends by clicking on username handle