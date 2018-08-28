import React, { Component } from 'react'
import { connect } from 'react-redux'
import { name, health, ac, init, strength, dex, con, wis, intel, cha, changeHealth } from '../../Ducks/player'
import { addCombatant } from '../../Ducks/gm'
import { socketConnect } from 'socket.io-react' 
// import io from 'socket.io-client'


class PlayerSetUp extends Component {
	handleSubmit = (e)=>{
		e.preventDefault();
		let { name, health, ac} = this.props.player;
		let { changeHealth, addCombatant } = this.props;
		if (name && health && ac){
			addCombatant(this.props.player); 
			changeHealth(health)
			this.props.history.push('/combat')
		} else {
			alert("You must have name, health, and AC values for your character")
		}
	}
	
	render(){
		let { socket } = this.props

		socket.on('start', function(/*more than on parameter must be an obj*/){})
		let { name, health, ac, init, strength, dex, con, wis, intel, cha} = this.props;
		return (
			<div>
				<form onSubmit={this.handleSubmit} name='playerForm' className='playerForm'>
					<input placeholder="Player Name" type='text'
					onChange={(e)=>name(e.target.value)}
					/>
					<br/>	
					<input placeholder="Health" type='number' onChange={(e)=>{health(e.target.value)}}/>	
					<input placeholder="Armor Class" type='number' onChange={(e)=>ac(e.target.value)}/>
					<input placeholder="Initiative Bonus" type='number' onChange={(e)=>init(e.target.value)}/>	
					<br/>	
					<p>Saving Throw Modifiers:</p>
					<input placeholder="Strength" type='number' onChange={(e)=>strength(e.target.value)}/>	
					<input placeholder="Dexterity" type='number' onChange={(e)=>dex(e.target.value)}/>
					<br/>	
					<input placeholder="Constitution" type='number' onChange={(e)=>con(e.target.value)}/>	
					<input placeholder="Wisdom" type='number' onChange={(e)=>wis(e.target.value)}/>	
					<br/>
					<input placeholder="Intelligence" type='number' onChange={(e)=>intel(e.target.value)}/>	
					<input placeholder="Charisma" type='number' onChange={(e)=>cha(e.target.value)}/>	
					<input type='submit' value="Ready?"/>
				</form>
			</div>
		)
	}
}

let mapStateToProps = (state)=>{
	let player = state.player
	return{player
	}
}

export default socketConnect(connect(mapStateToProps,{ name, health, ac, init, strength, dex, con, wis, intel, cha, changeHealth, addCombatant })(PlayerSetUp))

// let styles= {
// 	name: {
// 		width: '300px',
// 		fontSize: '3em',
// 		// margin:'0 auto',
// 		// display:'flex',
// 		// justifyContent:'center'
// 	}
// }