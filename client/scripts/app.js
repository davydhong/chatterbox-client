// YOUR CODE HERE:
// $(document).ready(function () {
// $(document).ready(function () {
var App = function (username, text, roomname) {
  this.username = username;
  this.text = text;
  this.roomname = roomname;
  // this.createdAt = moment().format();
  this.server = 'http://parse.sfm8.hackreactor.com/chatterbox/classes/messages';
};


App.prototype.init = function () {
  var messages = app.fetch();
};


App.prototype.send = function (message) {
  $.ajax({
    url: 'http://parse.sfm8.hackreactor.com/chatterbox/classes/messages',
    type: 'POST',
    data: JSON.stringify(message),
    contentType: 'application/json',
    success: function (data) {
      // console.log("message sent");
      app.message.val('');
      app.fetch();
    }
  });
};

App.prototype.fetch = function () {
  return $.ajax({
    url: 'http://parse.sfm8.hackreactor.com/chatterbox/classes/messages',
    type: 'GET',
    data: 'order=-createdAt',
    contentType: 'application/json',
    success: function (data) {
      var conTainSpecial = function (string) {
        var spec = ['~', '`', '!', '@', '#', '$', '%', '^', '&', '*', '(', ')', '-', '+', '=', '"', ';', ':', '/', '?', '{', '}', '|', '[', ']'];
        for (let i = 0; i < spec.length; i++) {
          if (string.indexOf(spec[i]) > -1) {
            return true;
          }
        }
        return false;
      };
      console.log('message received');
      for (let i = 0; i < data.results.length; i++) {
        // /!conTainSpecial(data.results[i].roomname);
        // if (data.results[i].hasOwnProperty('username') && data.results[i].hasOwnProperty('text') && data.results[i].hasOwnProperty('roomname') && data.results[i].hasOwnProperty('createdAt')) {
        if (data.results[i].hasOwnProperty('username') && data.results[i].hasOwnProperty('text') && data.results[i].hasOwnProperty('roomname') && data.results[i].hasOwnProperty('createdAt')) {
          if (JSON.stringify(data.results[i]).indexOf('<script>') === -1 && JSON.stringify(data.results[i]).indexOf('<style>') === -1) {  //this is our escape method
            app.renderMessage(data.results[i]);
            app.renderRoom(data.results[i]);
          }

        }
      }
    }
  });


};

App.prototype.clearMessages = function () {
  $('#chats').children().remove();
};
App.prototype.renderMessage = function (data) {
  $('#chats').append('<p class="message ' + data.roomname.split(" ").join("_") + '"><span class="username '+ data.username +'">' + data.username + '</span>: ' + data.text + '</p>');
  // $('#chats').append('<p class="message><a class="username">' + data.username + '</a>' + data.text + '</p>');
  //'<a class="roomname"> + data.roomname + '</a>'
  $('.username').off('click').on('click', app.handleUsernameClick);
};

App.prototype.renderRoom = function (data) {
  if ($('.room.' + data.roomname.split(" ").join("_")).length === 0) {
    $('#roomSelect').append('<option class="room ' + data.roomname.split(" ").join("_") + '">' + data.roomname + '</option>');
  }
  $('#roomSelect').change(function () {
    $('p').hide();
    $('.' + $(this).val()).show();
  });
};

App.prototype.handleUsernameClick = function (event) {
  debugger;

  $('#friends').append('<li>' + $(this).text() + '</li>');
  $(this).addClass('friended');
};

App.prototype.handleSubmit = function (event) {
  var message = {
    username: window.location.search.split('?username=')[1],
    text: $('input#message').val(),
    roomname: $('input#room').val() || $('#roomSelect').find(":selected").text()
  };
  app.send(message);

};
// });

var app = new App();
app.init();
setInterval(app.init, 60000);

$(document).ready(function () {
  // (function () {
  $('.submit').on('click', app.handleSubmit);

  // });
});


// $(document).ready(function () {
//   (function () {
//     $('.submit').on('click', app.handleSubmit);
//     $('#username').on('click', app.handleUsernameClick);
//   });
// });



// Rooms
// Allow users to create rooms and enter existing rooms - Rooms are defined by the .roomname property of messages, so you'll need to filter them somehow.
// Socializing
// Allow users to 'befriend' other users by clicking on their user name
// Display all messages sent by friends in bold