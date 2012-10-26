var express = require('express'),
    jade = require('jade'),
    routes = require('./routes'),
    app = express(),
    http = require('http'),
    server = http.createServer(app),
    socketServer = require('./app/socketServer'),
    io = require('socket.io').listen(server),
    pythonProc = require('./app/pythonProc');

// do express stuff
app.set('view engine', 'jade');
app.set('views', __dirname + '/views');
app.use(app.router)
  .use(express.bodyParser())
  .use(express.methodOverride())
  .use(express.static(__dirname + '/public'))
  .use(express.errorHandler());

app.get('/', routes.game);

server.listen(3000, function() {
  console.log('express server has started');
});

// listen for python sockets and do the right thing
// in this case, doing the right thing is
// broadcasting the message to all sockets
socketServer.init(function(action) {
  console.log('action: ' + action);
  io.sockets.emit('action', action);
});

// fork the python process
pythonProc.fork();
