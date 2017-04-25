
var express = require('express');
var app = express();
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var path = require('path');
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.use(express.static("public"));
app.use(bodyParser.json());

app.get('/', function(req, res){
    res.sendFile(path.join(__dirname, "../troll-patrol/public", '/index.html'));
});
io.on('connection', function(socket){
    console.log("a user connected");
    socket.on("new-message", function(msg){
        console.log(msg);
        io.emit("receive-message", msg);
    })
});
mongoose.connect("mongodb://localhost/troll-patrol", function(err){
    if(err)throw err;
    console.log("connected to DB");
})
http.listen(3000, function () {
   console.log('The Server Lives on port 3000')
});



