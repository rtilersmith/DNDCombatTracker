import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { name, health, ac, init, strength, dex, con, wis, intel, cha, changeHealth } from '../../Ducks/player'
import { addCombatant } from '../../Ducks/gm'

class PlayerSetUp extends Component {
	
	render(props){
		let { name, health, ac, init, strength, dex, con, wis, intel, cha, changeHealth, addCombatant } = this.props;
		return (
			<div>
				<form>
				<input placeholder="NAME" type='text' style={styles.name}
				onChange={(e)=>name(e.target.value)}/>
				<br/>	
				<input placeholder="Health" type='number' onChange={(e)=>{health(e.target.value)
				changeHealth(e.target.value)}}/>	
				<input placeholder="Armor Class" type='number' onChange={(e)=>ac(e.target.value)}/>
				<input placeholder="Initiative Bonus" type='number' onChange={(e)=>init(e.target.value)}/>	
				<br/>	
				<p>Saving Throw Modifiers:</p>
				<input placeholder="Strength" type='number' onChange={(e)=>strength(e.target.value)}/>	
				<input placeholder="Dexterity" type='number' onChange={(e)=>dex(e.target.value)}/>	
				<input placeholder="Constitution" type='number' onChange={(e)=>con(e.target.value)}/>	
				<input placeholder="Wisdom" type='number' onChange={(e)=>wis(e.target.value)}/>	
				<input placeholder="Intelligence" type='number' onChange={(e)=>intel(e.target.value)}/>	
				<input placeholder="Charisma" type='number' onChange={(e)=>cha(e.target.value)}/>	
				</form>
				<Link to='/combat' onClick={()=>{addCombatant(this.props.player)}}><button>Ready?</button>
				</Link>
			</div>
		)
	}
}

let mapStateToProps = (state)=>{
	let player = state.player
	return{player
	}
}

export default connect(mapStateToProps,{ name, health, ac, init, strength, dex, con, wis, intel, cha, changeHealth, addCombatant })(PlayerSetUp)

let styles= {
	name: {
		width: '300px',
		fontSize: '3em',
		// margin:'0 auto',
		// display:'flex',
		// justifyContent:'center'
	}
}