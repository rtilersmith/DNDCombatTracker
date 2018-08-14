import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { emailInput, passwordInput} from '../../Ducks/shared'

class Login extends Component{
	render(){
		return(
			<div>
				<h2>Welcome {this.props.role}</h2>
				<h3>Please Login</h3>
				<br/>
				<form>
				<input type='text' placeholder="email" value={this.props.email} onChange={(e)=>this.props.emailInput(e.target.value)} required/>
				<input type='text' placeholder="password" value={"*".repeat(this.props.password.length)} onChange={(e)=>this.props.passwordInput(e.target.value)} required/>
				{this.props.role==="Game Master"? <Link to="gmsetup">Login</Link> : 
				<Link to="playersetup">Login</Link> }
				</form>
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