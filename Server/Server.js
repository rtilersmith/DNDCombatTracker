const express=require('express'),
	  
	  massive=require('massive'),
	  bodyPar=require('body-parser'),
	  CombatCtrl=require('./Controllers/CombatCtrl'),
	  AuthCtrl = require('./Controllers/AuthCtrl'),
	  EnemyCtrl = require('./Controllers/EnemyCtrl'),
	  path = require('path'),
	  socket_io = require('socket.io'),
	  sharedsession = require("express-socket.io-session");
	  require('dotenv').config();
	  const session=require('express-session')({
		  secret: process.env.SESSION_SECRET,
		  resave: false,
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
app.delete('/api/combatant/:id&:battleId', CombatCtrl.delete);
app.post('/api/player', CombatCtrl.readPlayer)
app.post('/api/health', CombatCtrl.playerHealth)
app.get('/api/monsters', EnemyCtrl.read)
app.get('/api/monsters/:name', EnemyCtrl.readOne)

app.get('/api/loginCheck', AuthCtrl.checkLogin)
//http://dnd5eapi.co/api/monsters/ **Location for external API** Case sensitive, only monster manual creatures included.


app.get('*', (req, res)=>{
	res.sendFile(path.join(__dirname, '../build/index.html'));
});

const {SERVER_PORT}=process.env

const server = app.listen(SERVER_PORT, ()=> {
	console.log('How do you want to do this?', SERVER_PORT)
})

const io = socket_io(server)

io.use(sharedsession(session, {
	autoSave:true
}));

io.on('connection', function(socket){
	socket.emit('start', /*emit params sent as obj*/)
	if(!socket.handshake.session.user){
		socket.emit('no user')
	} else {
		socket.on('playerJoin', function(room){
			socket.handshake.session.battle=room.battle
			socket.join(room.battle);
			socket.on('playerHealth', function(player){
				io.to(room.battle).emit('playerHealth', room.battle)
			})
			socket.on('added', function(player){
				io.to(room.battle).emit('added', player)
			})
		})
		socket.on('join', function(){
			let battle;
			
			if(!socket.handshake.session.battle){
				battle = (Math.random().toString(36).substr(2,9).toUpperCase())
				socket.handshake.session.battle=battle;
				socket.handshake.session.save();
			} else {
				battle=socket.handshake.session.battle
			}
			socket.join(battle);
			socket.emit('battle', {battle})
			
			socket.on('gmHealth', function(player){
				io.to(battle).emit(`${player.name}`, player.change)
				io.to(battle).emit('gmHealth', battle)
			})
		})
		
		socket.on('leave', function(room){
			socket.leave(room.battle)
		})
	}
})