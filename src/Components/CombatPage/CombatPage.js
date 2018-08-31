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

	componentDidMount(){
		let {socket, name, changeHealth, history } = this.props;
		socket.on('no user', function(){
			console.log(history)
			history.push('/')
			
		})
		socket.on('gmHealth', function(player){
			if(name===player.name){
				changeHealth( +player.change)
			}
		})
	}

	addHealth = ()=>{
		let { socket, name, changeHealth, curHealth, setHealthChangeVal, healthChangeVal } = this.props;
		console.log('what up!', curHealth, healthChangeVal)
		let num = Number(curHealth) + Number(healthChangeVal);
		console.log(num, 111111)
		changeHealth( num )
		socket.emit('playerHealth', {name, change:healthChangeVal})
		setHealthChangeVal('')
	}

	subHealth = ()=>{
		let { socket, name, changeHealth, curHealth, setHealthChangeVal, healthChangeVal } = this.props;
		let neg = -( +healthChangeVal)
		let num = Number(curHealth) + neg;
		changeHealth( num )
		socket.emit('playerHealth', {name, change:healthChangeVal})
		setHealthChangeVal('')
	}

	render(props){
		// let { socket } = this.props
		// socket.emit('join', function(/*more than on parameter must be an obj*/){})
		let { name, health, ac, init, strength, dex, con, wis, intel, cha, curHealth, setHealthChangeVal }=this.props
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