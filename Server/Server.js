const express=require('express'),
	  
	  massive=require('massive'),
	  bodyPar=require('body-parser'),
	  CombatCtrl=require('./Controllers/CombatCtrl'),
	  AuthCtrl = require('./Controllers/AuthCtrl'),
	  path = require('path'),
	  socket_io = require('socket.io'),
	  sharedsession = require("express-socket.io-session");
	  require('dotenv').config();
	  const session=require('express-session')({
		  secret: process.env.SESSION_SECRET,
		  resave: true,
		  saveUninitialized: true
});
	  
	  const app=express()
massive(process.env.CONNECTION_STRING).then(db=>{
	app.set('db', db)
	console.log('db connect success!')
	})



app.use(bodyPar.json())

app.use(session)



app.use( express.static( `${__dirname}/../build` ) );

app.get('/auth/callback', AuthCtrl.auth)

app.get('/api/combatants', CombatCtrl.read);
app.post('/api/combatants', CombatCtrl.create);
app.get('/api/combatant/:id', CombatCtrl.readOne)
app.put('/api/combatant/:id', CombatCtrl.update);
app.delete('/api/combatant/:id', CombatCtrl.delete);
app.post('/api/player', CombatCtrl.readPlayer)

//http://dnd5eapi.co/api/monsters/ **Location for external API** Case sensitive, only monster manual creatures included.


app.get('*', (req, res)=>{
	res.sendFile(path.join(__dirname, '../build/index.html'));
});

const {SERVER_PORT}=process.env

const server = app.listen(SERVER_PORT, ()=> {
	console.log('How do you want to do this?', SERVER_PORT)
})

const io = socket_io(server)

io.use(sharedsession(session)//, null, {
	// 	autoSave:true
	// }
);

io.on('connection', function(socket){
	console.log('user connected')
	socket.emit('start', /*emit params sent as obj*/)
	socket.on('playerJoin', function(room){
		socket.handshake.session.battle=room.battle
		socket.join(room.battle);
		socket.on('playerHealth', function(player){
			io.to(room.battle).emit('battle', player)
		})
		socket.on('added', function(player){
			io.to(room.battle).emit('added', player)
		})
	})

	socket.on('join', function(){
		let battle;
		if(!socket.handshake.session.battle){
			battle = (Math.random().toString(36).substr(2,9).toUpperCase())
			console.log('setting battle', battle)
			socket.handshake.session.battle=battle;
			socket.handshake.session.save();
		} else {
			battle=socket.handshake.session.battle
		}
		socket.join(battle);
		socket.emit('battle', {battle})
		console.log(' user joined ',battle)

	})

	socket.on('leave', function(room){
		socket.leave(room.battle)
		console.log('user has left room ', room.battle)
	})
	
	socket.on('enemyHealth', function(player){
		io.to(battle).emit('health', player)
	})
	
})