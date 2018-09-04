import React, { Component } from 'react'
import { connect } from 'react-redux'
import { emailInput, passwordInput} from '../../Ducks/shared'
import { socketConnect } from 'socket.io-react' 


class Login extends Component{
	componentDidMount(){
		let {socket, history, role}=this.props;
		socket.on('start', function(/*more than on parameter must be an obj*/){})	
		if(!role){
			history.push('/')
		}
	}

	login=(props)=>{
		let auth0domain = `https://${process.env.REACT_APP_AUTH0_DOMAIN}`
		let clientId = process.env.REACT_APP_AUTH0_CLIENT_ID;
		let scope = encodeURIComponent("openid profile email");
		let redirectUri = encodeURIComponent(`${window.location.origin}/auth/callback?role=${this.props.role}`);
	
		let location = `${auth0domain}/authorize?client_id=${clientId}&scope=${scope}&redirect_uri=${redirectUri}&response_type=code`
	
		window.location = location;
	}

	render(){
		return(
			<div>
				<h2>Welcome.</h2>
				<h3>Login with your Gmail or Github account.</h3>
				{this.props.role==="gm"? <button to="gm" className='link' onClick={this.login}>Login/Register</button> : 
				<button to="playersetup" className='link' onClick={this.login}>Login/Register</button> }
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
export default socketConnect(connect(mapStateToProps, {emailInput, passwordInput})(Login))