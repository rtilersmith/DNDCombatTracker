const axios = require('axios')
const bcrypt = require('bcrypt')

module.exports = {
	auth: async (req, res)=>{
		try {
			// let auth0domain = `https://${process.env.REACT_APP_AUTH0_DOMAIN}`
			// let { code, role } = req.query
			// let payload = {
			// 	client_id: process.env.REACT_APP_AUTH0_CLIENT_ID,
			// 	client_secret: process.env.AUTH0_CLIENT_SECRET,
			// 	code,
			// 	grant_type: 'authorization_code',
			// 	redirect_uri: `${process.env.SERVER_PROTOCOL}://${req.headers.host}/auth/callback`
			// }

			// let accessTokenResponse = await axios.post(`${auth0domain}/oauth/token`, payload)
			// let accessToken= accessTokenResponse.data.access_token;
			// let userInfoResponse = await axios.get(`${auth0domain}/userinfo?access_token=${accessToken}`)

			// let userInfo = userInfoResponse.data;

			// let db = req.app.get('db')

			// let users = await db.findUserByAuthId(userInfo.sub)

			// if (users.length){
			// 	req.session.user = users[0]
			// 	req.session.loggedIn = true;
			// 	res.redirect(`/${role}setup`)
			// } else {
			// 	let users = db.createUser(userInfo)
			// 	req.session.user = users[0]
			// 	req.session.loggedIn = true;
			// 	res.redirect(`/${role}setup`)
			// }

		} catch (error){
			console.log('We have a problem', error)
			res.redirect('/error')
		}

	},

	bcrypt: async (req, res) => {
		try {
			let db = req.app.get('db')
			let { email, password, role } = req.body;

			let user = await db.getUser([email])
			if(!user[0]) {
				return res.status(401).send('User not found. Please register your account.')
			}
			let authentication = bcrypt.compareSync(password, user[0].password);

			if (!authentication) {
				return res.status(403).send('Incorrect password')
			}

			if(user[0] && role ) {
				res.redirect(`${role}setup`)
			} else {return res.redirect('/')}
			

			req.session.user = {name: user[0].name, email, loggedin: true}

			return res.status(200).send(req.session.user)
		} catch (error) {
			console.log(`error with user login: ${error}`)
			return res.sendStatus(500)
		}
	},

	checkLogin: (req, res) => {
		if(req.session.loggedIn) {
			let battle = req.session.battle? {code:req.session.battle}: true;
			res.send(battle) 
		}
		else {
			res.send(false)
		}
	}
}