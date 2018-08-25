import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { setRole } from '../../Ducks/shared'
import './Landing.css'

function Landing(props){
	return(
		<div className="landingContainer">
		<h2>Let the combat begin</h2>
		<h3>What is your role?</h3>
		<Link to='/login' onClick={()=>props.setRole('Player')}className='link'>Player</Link>
		<Link to='/login'  onClick={()=>props.setRole('Game Master')}className='link'>Game Master</Link>
		
	</div>
	)
}

export default connect(null, {setRole})(Landing)