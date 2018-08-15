import React, { Component } from 'react'
import { connect } from 'react-redux'
import { name, health, ac, init, strength, dex, con, wis, intel, cha, changeHealth } from '../../Ducks/enemy'
import { addCombatant } from '../../Ducks/gm'


class Customenemy extends Component {
	render(){
		let { name, health, ac, init, strength, dex, con, wis, intel, cha, changeHealth, addCombatant } = this.props;
		return (
			<div>
				<form>
					<input placeholder="NAME" type='text' onChange={(e)=>name(e.target.value)}/>
					<br/>	
					<input placeholder="Health" type='number' onChange={(e)=>{health(e.target.value)
					}}/>	
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
					<button onClick={()=>{addCombatant(this.props.enemy); changeHealth(this.props.enemy.health)}}>Add</button>
				</form>
			</div>
		)
	}
}


let mapStateToProps = (state)=>{
	let enemy = state.enemy
	return{enemy
	}
}

export default connect(mapStateToProps,{ name, health, ac, init, strength, dex, con, wis, intel, cha, changeHealth, addCombatant })(Customenemy)