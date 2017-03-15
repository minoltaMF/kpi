/**
 * Created by Donny on 17/2/28.
 */
var express = require('express');
var ejs = require('ejs');
var path = require('path');
var bodyParser = require("body-parser");
var kpiPages = require('./routes/kpiPages');

var app = express();

var server = require('http').createServer(app);
var io = require('socket.io')(server);

app.engine('.html', ejs.__express);
app.set('view engine', 'html');
app.set('views', __dirname + '/views');
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api/kpiPages', kpiPages);

// io.on('connection', function (socket) {
//     console.log('a user connected');
//
//     socket.on('disconnect', function () {
//         console.log('user disconnected');
//     });
//
//     socket.on('chatMessage', function (data) {
//         // we tell the client to execute 'new message'
//         socket.emit('chatMessage', data);
//         console.log(data);
//     });
// });

server.listen(3010, function () {
    console.log('Example app listening on port 3010!');
});