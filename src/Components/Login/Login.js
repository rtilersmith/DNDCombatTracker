import React, { Component } from 'react'
import { connect } from 'react-redux'
import { emailInput, passwordInput} from '../../Ducks/shared'
import { socketConnect } from 'socket.io-react' 
import { validateEmail } from '../../_utils/methods'
import axios from 'axios'



class Login extends Component{

	constructor(props){
		super(props)

		this.state = {
			email: '',
			password: '',
			err: ''
		}
	}
	componentDidMount(){
		let {socket, history, role}=this.props;
		socket.on('start', function(/*more than on parameter must be an obj*/){})	
		if(!role){
			history.push('/')
		}
	}

	handleChange = e => {
		let {name, value} = e.target
		this.setState({[name]: value})
	}

	login=(e)=>{
		e.preventDefault();	
		let { history } = this.props
		let {password} = this.state;
		let email = this.state.email.toLowerCase()
		if(!validateEmail(email)){
			let err = "This is not a valid email address."
			return this.setState({err})
		}
		axios.post('/auth/login', {email, password, role:this.props.role}).then(results => {
			console.log(results)
		}).catch(err => {
			console.log('err', err)
			this.setState({err: err.response.data})
		})
		history.push(`/${this.props.role}setup`)
	}

	render(){
		return(
			<div>
				<h2>Welcome.</h2>
				<form onSubmit={this.login}>
					<input required={true} type='text' name='email' value={this.state.email} placeholder="Email" onChange={this.handleChange}/>
					<input required={true} type='password' name='password' value={this.state.password} placeholder="Password" onChange={this.handleChange}/>
					{this.props.role==="gm"? <button to="gm" className='link' onClick={this.login}>Login/Register</button> : 
					<button to="playersetup" className='link'>Login</button> }
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
export default socketConnect(connect(mapStateToProps, {emailInput, passwordInput})(Login))