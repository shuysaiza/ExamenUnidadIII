
let http = require('http');
let url = require('url');
let path = require('path');

let fs = require('fs');

let datos=[];

let server = http.createServer(handleRequest);
server.listen(8080);

console.log('Server started on port 8080');

function handleRequest(req, res) {
  let pathname = req.url;
  
  if (pathname == '/') {
    pathname = '/index.html';
  }
  
  let ext = path.extname(pathname);

  let typeExt = {
    '.html': 'text/html',
    '.js':   'text/javascript',
    '.css':  'text/css'
  };

  let contentType = typeExt[ext] || 'text/plain';

  fs.readFile(__dirname + pathname,
    function (err, data) {
      if (err) {
        res.writeHead(500);
        return res.end('Error loading ' + pathname);
      }
      res.writeHead(200,{ 'Content-Type': contentType });
      res.end(data);
    }
  );
}

let io = require('socket.io').listen(server);

io.sockets.on('connection',
  function (socket) {
  
    console.log("We have a new client: " + socket.id);
  
    socket.on('dibujo',
      function(data) {

        console.log("Dibujo Recibido");

        socket.broadcast.emit('dibujon', data);

        Array.prototype.push.apply(datos,data)

      }
    );

    socket.on('previo',function(e){
      console.log("Solicitud Recibida")
        socket.emit("datos",datos)
    });
    
    socket.on('disconnect', function() {
      console.log("Client has disconnected");
    });
  }
);