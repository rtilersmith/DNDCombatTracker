//server stuff
socket_io = require('socket.io')

io.on('connection', function(socket){

	socket.emit('start', /*emit params sent as obj*/)

})


//front end stuff
import io from 'socket.io-client'
import { socketConnect } from 'socket.io-react' 
//look up socket.io-client to see if I can figure it out if I don't use react option

// in constructor function
this.props.socket.on('start', function(/*more than on parameter must be an obj*/){})
//{socketprovider} from 'socket.io-react' goes in same place as HASHROUTER
//SOCKETPROVIDER GOES AROUND THE ROUTER IN INDEX.JS
const socket = io.connect(process.env.REACT_APP_SOCKET_URL)
// socket.broadcast.to will go to whole room


//used to link to a specific room
io.on('connection', function(socket){
	socket.join('specific room');
  });
  
//used to 'emit' to the specific room
io.to/*OR .on*/('specific room').emit('some event');
