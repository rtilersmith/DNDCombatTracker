import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { emailInput, passwordInput} from '../../Ducks/shared'

class Login extends Component{

	login(){
		let auth0domain = `https://${process.env.REACT_APP_AUTH0_DOMAIN}`
		let clientId = process.env.REACT_APP_AUTH0_CLIENT_ID;
		let scope = encodeURIComponent("openid profile email");
		let redirectUri = encodeURIComponent(`${window.location.origin}/auth/callback?role=${this.props.role}`);
	
		let location = `${auth0domain}/authorize?client_id=${clientId}&scope=${scope}&redirect_uri=${redirectUri}&response_type=code `
	
		window.location = location;
	}

	render(){
		return(
			<div>
				<h2>Welcome</h2>
				<h3>Please login with your Gmail or Facebook account</h3>
				<h4>You will be directed to Auth0.com for this</h4>
				{this.props.role==="Game Master"? <Link to="gm" className='link'>Login/Register</Link> : 
				<Link to="playersetup" className='link'>Login/Register</Link> }
			</div>
		)
	}
}

let mapStateToProps=(state)=>{
	return {
		role: state.shared.role,
		email: state.shared.email,
		password: state.shared.password
	}
}
export default connect(mapStateToProps, {emailInput, passwordInput})(Login)