const path = require('path');
const express = require('express');
const axios = require('axios');
var cors = require('cors');
var xss = require("xss")
const { v4: uuidv4 } = require('uuid');
const http = require('http');
const app = express();
app.use(express.urlencoded({ extended: false }));
app.use(cors())
app.use(express.json())
var server = http.Server(app)
var io = require('socket.io')(server)
const { ExpressPeerServer } = require('peer');

const peerServer = ExpressPeerServer(server, {
    debug: true
})
var utils= require("./utils") ;
const exp = require('constants');
app.use('/peerjs', peerServer)
app.set('view engine', 'ejs');

app.use(express.static(path.resolve(__dirname, '../client/build')));

app.set('port', (process.env.PORT || 8080))

sanitizeString = (str) => {
	return xss(str)
}

connections = {}
messages = {}
timeOnline = {}

app.get('/home', (req,res) => {
    console.log("hello from the server-side26");
    res.json({ message: "Welcome to Alexandria" });
    // check if user is already logged in:

});
app.get('/:id/home', (req,res) => {
    console.log("hello from the server-side-32");
    console.log(req.params.id);
    utils.getData("users", req.params.id, function(data) {
        console.log("data", data)
        res.json(data);
    });
});


// // All other GET requests not handled before will return our React app
// app.get('*', (req, res) => {
//     res.sendFile(path.resolve(__dirname, '../client/build', 'index.html'));
//   });
  
// app.get('/home',(req, res) => {
//     console.log("hello from the server-side");
//     res.render("home", {username: "Riya", rooms: ["A","B","C","D"]});  
// });

// create a room
app.get('/room',(req,res)=>{
    var roomID= uuidv4();
    console.log("room url", `/room/${roomID}`)
    res.redirect(`/room/${roomID}`);   
});

 
app.get('/room/:room', (req, res) => {
    console.log("rendered");
    res.render('room', { roomId: req.params.room });    
})

io.on('connection', (socket) => {

	socket.on('join-call', (path) => {
		if(connections[path] === undefined){
			connections[path] = []
		}
		connections[path].push(socket.id)

		timeOnline[socket.id] = new Date()

		for(let a = 0; a < connections[path].length; ++a){
			io.to(connections[path][a]).emit("user-joined", socket.id, connections[path])
		}

		if(messages[path] !== undefined){
			for(let a = 0; a < messages[path].length; ++a){
				io.to(socket.id).emit("chat-message", messages[path][a]['data'], 
					messages[path][a]['sender'], messages[path][a]['socket-id-sender'])
			}
		}

		console.log(path, connections[path])
	})

	socket.on('signal', (toId, message) => {
		io.to(toId).emit('signal', socket.id, message)
	})

	socket.on('chat-message', (data, sender) => {
		data = sanitizeString(data)
		sender = sanitizeString(sender)

		var key
		var ok = false
		for (const [k, v] of Object.entries(connections)) {
			for(let a = 0; a < v.length; ++a){
				if(v[a] === socket.id){
					key = k
					ok = true
				}
			}
		}

		if(ok === true){
			if(messages[key] === undefined){
				messages[key] = []
			}
			messages[key].push({"sender": sender, "data": data, "socket-id-sender": socket.id})
			console.log("message", key, ":", sender, data)

			for(let a = 0; a < connections[key].length; ++a){
				io.to(connections[key][a]).emit("chat-message", data, sender, socket.id)
			}
		}
	})

	socket.on('disconnect', () => {
		var diffTime = Math.abs(timeOnline[socket.id] - new Date())
		var key
		for (const [k, v] of JSON.parse(JSON.stringify(Object.entries(connections)))) {
			for(let a = 0; a < v.length; ++a){
				if(v[a] === socket.id){
					key = k

					for(let a = 0; a < connections[key].length; ++a){
						io.to(connections[key][a]).emit("user-left", socket.id)
					}
			
					var index = connections[key].indexOf(socket.id)
					connections[key].splice(index, 1)

					console.log(key, socket.id, Math.ceil(diffTime / 1000))

					if(connections[key].length === 0){
						delete connections[key]
					}
				}
			}
		}
	})
})

server.listen(app.get('port'), () => {
	console.log("listening on", app.get('port'))
})