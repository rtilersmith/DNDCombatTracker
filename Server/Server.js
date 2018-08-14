const express=require('express'),
	  session=require('express-session'),
	  massive=require('massive'),
	  bodyPar=require('body-parser')
	  CombatCtrl=require('./Controllers/CombatCtrl');
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

app.get('/api/combatants', CombatCtrl.read);
app.post('/api/combatants', CombatCtrl.create);
app.get('/api/combatant/:id', CombatCtrl.readOne)
app.put('/api/combatant/:id', CombatCtrl.update);
app.delete('/api/combatant/:id', CombatCtrl.delete);

//http://dnd5eapi.co/api/monsters/ **Location for external API** Case sensitive, only monster manual creatures included.




const {SERVER_PORT}=process.env

app.listen(SERVER_PORT, ()=> {
	console.log('How do you want to do this?', SERVER_PORT)
})