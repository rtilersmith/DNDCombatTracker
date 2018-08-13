import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { setRole } from '../../Ducks/reducer'

function Landing(props){
	return(
		<div className="landingContainer">
		<h1>Let the combat begin</h1>
		<h3>What is your role?</h3>
		<Link to='/login' onClick={()=>props.setRole('Player')}><button>Player</button></Link>
		<Link to='/login'  onClick={()=>props.setRole('Game Master')}><button>Game Master</button></Link>
	</div>
	)
}

export default connect(null, {setRole})(Landing)