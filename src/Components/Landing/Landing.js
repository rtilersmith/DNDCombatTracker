import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { setRole } from '../../Ducks/shared'
import './Landing.css'

class Landing extends Component{
	
	render(){
		return(
		<div className="landingContainer">
			<h2>Let the combat begin.</h2>
			<div class= "roleBtns">
				<Link to='/login' onClick={()=>this.props.setRole('player')}className='link'>Player</Link>
				<Link to='/login'  onClick={()=>this.props.setRole('gm')}className='link'>Game Master</Link>
			</div>
			<h3>What is your role?</h3>
			<h4>You will be redirected to login/register.</h4>
		</div>
	)
	}
}

export default connect(null, {setRole})(Landing)