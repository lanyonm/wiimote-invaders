var io = require('websocket.io').listen(3100);

var socketServer = module.exports = {
  init: function(cb) {
    io.on('connection', function (client) {
      console.log('got a connection!');
      client.on('message', function (msg) {
        // console.log('message: ' + msg);
        cb(msg);
      });
      client.on('close', function () {
        console.log('closing!!!');
      });
    });
  }
};
