import React, { Component } from 'react'
import { connect } from 'react-redux'
import { changeHealth } from '../../Ducks/player'
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
		let { healthChange } = this.state
		let { socket, name, changeHealth, curHealth } = this.props;
		changeHealth( +curHealth + +healthChange)
		socket.emit('playerHealth', {name:name, change:healthChange})
		this.setState({
			healthChange:''
		})
	}

	subHealth = ()=>{
		let neg = -( +this.state.healthChange)
		let { socket, name, changeHealth, curHealth } = this.props;
		changeHealth( +curHealth + neg)
		socket.emit('playerHealth', {name, change:neg})
		this.setState({
			healthChange:''
		})
	}



	handleNum=(e)=>{
		this.setState({
			healthChange:e.target.value
		})
	}

	render(props){
		// let { socket } = this.props
		// socket.emit('join', function(/*more than on parameter must be an obj*/){})
		let {name, health, ac, init, strength, dex, con, wis, intel, cha, curHealth}=this.props
		return (
			<div>

				Name:{name}<br/>
				Max Health:{health}<br/>
				Current Health:{curHealth}<input type='number' value={this.state.healthChange} onChange={this.handleNum}/>
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
	let {name, health, ac, init, strength, dex, con, wis, intel, cha, curHealth}=state.player;
	return {
		name, health, ac, init, strength, dex, con, wis, intel, cha, curHealth
	}
}

export default socketConnect(connect(mapStateToProps, {changeHealth})(CombatPage))