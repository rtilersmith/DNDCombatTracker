import React, { Component } from 'react'
import { connect } from 'react-redux'
import { handleName, handleHealth, handleAc, init, strength, dex, con, wis, intel, cha, changeHealth } from '../../Ducks/enemy'
import { addEnemy } from '../../Ducks/gm'


class Customenemy extends Component {
	handleSubmit = (e)=>{
		e.preventDefault();
		let { name, health, ac} = this.props.enemy;
		let { changeHealth, addEnemy, room } = this.props
		if (name && health && ac && room){
			addEnemy({...this.props.enemy, room}); 
			changeHealth(health)
		} else {
			alert("You must have name/type, health, and AC values for your enemy")
		}

	}

	render(){
		let { handleName, handleHealth, handleAc, init, strength, dex, con, wis, intel, cha} = this.props;
		return (
			<div>
				<form onSubmit={this.handleSubmit} name='enemyForm'>
					<input placeholder="Name/Type" type='text' onChange={(e)=>handleName(e.target.value)}/>
					<br/>	
					<input placeholder="Health" type='number' onChange={(e)=>{handleHealth(e.target.value)
					}}/>	
					<input placeholder="Armor Class" type='number' onChange={(e)=>handleAc(e.target.value)}/>
					<input placeholder="Initiative Bonus" type='number' onChange={(e)=>init(e.target.value)}/>	
					<br/>	
					<p>Saving Throw Modifiers:</p>
					<input placeholder="Strength" type='number' onChange={(e)=>strength(e.target.value)}/>	
					<input placeholder="Dexterity" type='number' onChange={(e)=>dex(e.target.value)}/>	
					<input placeholder="Constitution" type='number' onChange={(e)=>con(e.target.value)}/>	
					<input placeholder="Wisdom" type='number' onChange={(e)=>wis(e.target.value)}/>	
					<input placeholder="Intelligence" type='number' onChange={(e)=>intel(e.target.value)}/>	
					<input placeholder="Charisma" type='number' onChange={(e)=>cha(e.target.value)}/>	
					<input type='submit' value="Add"/>
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

export default connect(mapStateToProps,{ handleName, handleHealth, handleAc, init, strength, dex, con, wis, intel, cha, changeHealth, addEnemy })(Customenemy)