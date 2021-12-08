let {Server : SocketIO } = require('socket.io');
let Productos = require('../../src/Productos.js');

class Socket{
    static instancia;

    constructor(http){
        if(Socket.instancia){
            return Socket.instancia;
        }
        Socket.instancia = this;

        this.io = new SocketIO(http);
        this.productos = new Productos(); // La instancia de conexion del socket contiene los productos.
        
        this.usuarios = []; 
        this.mensajes = [];
    }

    init(){

        try{
            this.io.on('connection', socket => {
                console.log(`Usuario ${socket.id} conectado...`);
                
                socket.on('producto', data => {
                    // Conexion 1:1
                    socket.emit('listenserver', this.productos.getAll());
                });

                // Evento de escucha cuando un cliente ingresa producto: (recibe)
                socket.on('new_producto', data => {
                    this.productos.save(data);
                    console.log(this.productos.getAll());
                    this.io.sockets.emit('listenserver', this.productos.getAll());
                });

            });
        } catch(error) {
            console.log(error);
        }


    }
}


module.exports = Socket;

/*
socket.emit('message', "this is a test"); //sending to sender-client only
socket.broadcast.emit('message', "this is a test"); //sending to all clients except sender
socket.broadcast.to('game').emit('message', 'nice game'); //sending to all clients in 'game' room(channel) except sender
socket.to('game').emit('message', 'enjoy the game'); //sending to sender client, only if they are in 'game' room(channel)
socket.broadcast.to(socketid).emit('message', 'for your eyes only'); //sending to individual socketid
io.emit('message', "this is a test"); //sending to all clients, include sender
io.in('game').emit('message', 'cool game'); //sending to all clients in 'game' room(channel), include sender
io.of('myNamespace').emit('message', 'gg'); //sending to all clients in namespace 'myNamespace', include sender
socket.emit(); //send to all connected clients
socket.broadcast.emit(); //send to all connected clients except the one that sent the message
socket.on(); //event listener, can be called on client to execute on server
io.sockets.socket(); //for emiting to specific clients
io.sockets.emit(); //send to all connected clients (same as socket.emit)
io.sockets.on() ; //initial connection from a client.
The io variable represents the group of sockets.
 The code you have starts on line one with providing a function in the second parameter 
 that gives you a socket variable every time a new connection is made. 
 The socket variable is only for communicating with each individual connection. 
 You may not see it in the code but there will be one socket variable for each connection established

*/