var WebSocket = require('ws');
var WebSocketServer = WebSocket.Server;
var port = 3001;
var ws = new WebSocketServer({
  port: port
});
var messages = [];
var messageshis = [];
console.log('websockets server started');
ws.on('connection', function(socket) {
  console.log('client connection established');

  messageshis.forEach(function(msg) {
    socket.send(msg);
  });

  messages.pop();
  messages.forEach(function(msg) {
    socket.send(msg);
  });

  socket.on('message', function(data) {
    console.log('message received: ' + data);
    var res = data.split(" ");
    if(res[0]=="/topic")
    {
      res.shift();
      var res = res.join(" ");
      data = ('*** Topic has changed to ' + "'" + res + "'");
      data1 = ('*** Topic is ' + "'" + res + "'" );
      messageshis.push(data1);
    }
    //console.log(data1);
    messages.push(data);
//    messageshis.push(data1);
  //  console.log(messages);

    ws.clients.forEach(function(clientSocket) {
      clientSocket.send(data)
    });
  });
});
