const express=require('express'),
	  session=require('express-session'),
	  massive=require('massive'),
	  bodyPar=require('body-parser'),
	  CombatCtrl=require('./Controllers/CombatCtrl'),
	  AuthCtrl = require('./Controllers/AuthCtrl'),
	  socket_io = require('socket.io');
	  require('dotenv').config()
	  
	  const app=express()
massive(process.env.CONNECTION_STRING).then(db=>{
	app.set('db', db)
	console.log('db connect success!')
	})



app.use(bodyPar.json())
app.use(session({
	secret: process.env.SESSION_SECRET,
	resave: false,
	saveUninitialized: false
}))

app.get('/auth/callback', AuthCtrl.auth)

app.get('/api/combatants', CombatCtrl.read);
app.post('/api/combatants', CombatCtrl.create);
app.get('/api/combatant/:id', CombatCtrl.readOne)
app.put('/api/combatant/:id', CombatCtrl.update);
app.delete('/api/combatant/:id', CombatCtrl.delete);

//http://dnd5eapi.co/api/monsters/ **Location for external API** Case sensitive, only monster manual creatures included.




const {SERVER_PORT}=process.env

const server = app.listen(SERVER_PORT, ()=> {
	console.log('How do you want to do this?', SERVER_PORT)
})

const io = socket_io(server)

io.on('connection', function(socket){
	console.log('user connected')
	socket.emit('start', /*emit params sent as obj*/)
	
})