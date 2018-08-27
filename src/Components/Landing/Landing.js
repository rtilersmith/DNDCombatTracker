import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { setRole } from '../../Ducks/shared'
import io from 'socket.io-client'
import { socketConnect } from 'socket.io-react' 
import './Landing.css'

class Landing extends Component{
	
	render(){
		this.props.socket.on('start', function(/*more than on parameter must be an obj*/){})
		return(
			<div className="landingContainer">
			<h2>Let the combat begin</h2>
			<h3>What is your role?</h3>
			<Link to='/login' onClick={()=>this.props.setRole('Player')}className='link'>Player</Link>
			<Link to='/login'  onClick={()=>this.props.setRole('Game Master')}className='link'>Game Master</Link>
		</div>
	)
	}
}

export default socketConnect(connect(null, {setRole})(Landing))