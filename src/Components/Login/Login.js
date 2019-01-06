import React, { Component } from 'react'
import { connect } from 'react-redux'
import { emailInput, passwordInput} from '../../Ducks/shared'
import { socketConnect } from 'socket.io-react' 
import { validateEmail } from '../../_utils/methods'



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
		 history.push(`/${this.props.role}setup`)
		}).catch(err => {
			console.log('err', err)
			this.setState({err: err.response.data})
		})
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