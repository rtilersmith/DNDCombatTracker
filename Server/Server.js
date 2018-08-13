const express=require('express'),
	  session=require('express-session'),
	  massive=require('massive'),
	  bodyPar=require('body-parser');
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



const {SERVER_PORT}=process.env

app.listen(SERVER_PORT, ()=> {
	console.log('How do you want to do this?', SERVER_PORT)
})