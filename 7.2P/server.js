let express = require("express");
let app = express();
let http = require('http').createServer(app);
let io = require('socket.io')(http);
var port = process.env.PORT || 3000;

app.use(express.static(__dirname + '/public'));

// GET route - returns session title
app.get("/session", function (request, response) {
  var session_name = request.query.session_name;
  response.end("Feedback open for: " + session_name + "!");
});

// --- State ---
let feedbacks = []; // { rating, comment, time }

// --- Socket.IO ---
io.on('connection', (socket) => {
  console.log('a user connected');

  // Send current feedbacks to the newly connected user
  socket.emit('feedback-list', feedbacks);

  // Student submits feedback
  socket.on('submit-feedback', (data) => {
    const entry = {
      rating: data.rating,
      comment: data.comment.trim().slice(0, 200),
      time: new Date().toLocaleTimeString(),
    };
    feedbacks.push(entry);
    console.log('New feedback received:', entry);

    // Broadcast updated list to everyone
    io.emit('feedback-list', feedbacks);
  });

  // Teacher resets all feedback
  socket.on('reset', () => {
    feedbacks = [];
    console.log('Feedback reset');
    io.emit('feedback-list', feedbacks);
  });

  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});

http.listen(port, () => {
  console.log("Listening on port ", port);
});
