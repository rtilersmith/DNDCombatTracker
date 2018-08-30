import React, { Component } from 'react'
import { connect } from 'react-redux'
import { changeHealth, setHealthChangeVal } from '../../Ducks/player'
import { socketConnect } from 'socket.io-react' 
// import io from 'socket.io-client'


class CombatPage extends Component{
	constructor(){
		super()
		this.state={
			healthChange:'',
		}
	}

	addHealth = ()=>{
		let { socket, name, changeHealth, curHealth, setHealthChangeVal, healthChangeVal } = this.props;
		changeHealth( +curHealth + +healthChangeVal)
		socket.emit('playerHealth', {name:name, change:healthChangeVal})
		setHealthChangeVal('')
	}

	subHealth = ()=>{
		let { socket, name, changeHealth, curHealth, setHealthChangeVal, healthChangeVal } = this.props;
		let neg = -( +healthChangeVal)
		changeHealth( +curHealth + neg)
		socket.emit('playerHealth', {name, change:neg})
		setHealthChangeVal('')
	}

	render(props){
		// let { socket } = this.props
		// socket.emit('join', function(/*more than on parameter must be an obj*/){})
		let {name, health, ac, init, strength, dex, con, wis, intel, cha, curHealth, setHealthChangeVal, healthChangeVal}=this.props
		return (
			<div>

				Name:{name}<br/>
				Max Health:{health}<br/>
				Current Health:{curHealth}<input type='number' onChange={(e)=>{setHealthChangeVal(e.target.value)}}/>
				<button onClick={this.addHealth}>+</button>
				<button onClick={this.subHealth}>-</button>
				<br/>
				Armor Class:{ac}<br/>
				Initiative:{init}<br/>
				Saving Throws:
				Strength:{strength}<br/>
				Dexterity:{dex}<br/>
				Constitution:{con}<br/>
				Wisdom:{wis}<br/>
				Intelligence{intel}<br/>
				Charisma{cha}<br/>
			</div>
		)
	}
}

let mapStateToProps=(state)=>{
	let {name, health, ac, init, strength, dex, con, wis, intel, cha, curHealth, healthChangeVal}=state.player;
	return {
		name, health, ac, init, strength, dex, con, wis, intel, cha, curHealth, healthChangeVal
	}
}

export default socketConnect(connect(mapStateToProps, {changeHealth, setHealthChangeVal})(CombatPage))