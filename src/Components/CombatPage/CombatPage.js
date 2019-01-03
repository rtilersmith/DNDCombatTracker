import React, { Component } from 'react'
import { connect } from 'react-redux'
import { changeHealth, setHealthChangeVal } from '../../Ducks/player'
import { socketConnect } from 'socket.io-react'
import axios from 'axios'
// import io from 'socket.io-client'


class CombatPage extends Component{
	constructor(){
		super()
		this.state={
			healthChange:'',
			currentHP:''
		}
	}

	componentDidMount(){
		let {socket, name, history, changeHealth, battleId, setHealthChangeVal } = this.props;

		axios.get('/api/loginCheck').then(res=>{
			if(!res.data){
				history.push('/')
			}
			if(!res.data.code){
				history.push('/playersetup')
			}
		})

		socket.on(`${name}`, function(player){
			changeHealth({name, num:player.change, battleId}).then(res=>{
				setHealthChangeVal(0)
			})
		})

	}

	addHealth = ()=>{
		let { socket, name, changeHealth, curHealth, setHealthChangeVal, healthChangeVal, battleId } = this.props;
		let num = Number(curHealth) + Number(healthChangeVal);
		changeHealth( {name, num, battleId} ).then(res=>{
		socket.emit('playerHealth', {name, change:healthChangeVal})
		setHealthChangeVal(0)
		})
	}

	subHealth = ()=>{
		let { socket, name, changeHealth, curHealth, setHealthChangeVal, healthChangeVal, battleId } = this.props;
		let neg = -( +healthChangeVal)
		let num = Number(curHealth) + neg;
		changeHealth( {name, num, battleId} ).then(res=>{
			socket.emit('playerHealth', {name, change:healthChangeVal})
			setHealthChangeVal(0)
		})
	}

	render(props){
		// let { socket } = this.props
		// socket.emit('join', function(/*more than on parameter must be an obj*/){})
		let { name, health, ac, init, strength, dex, con, wis, intel, cha, curHealth, healthChangeVal, setHealthChangeVal }=this.props
		return (
			<div>

				Name: {name} <br/>
				Max Health: {health}<br/>
				Current Health: {curHealth}<br/>
				<div className="plusMinus">
				<input className="currentHealth" type='number' value={healthChangeVal} onChange={(e)=>{setHealthChangeVal(e.target.value)}}/>
					<button className="buttonPlusMinus" onClick={this.addHealth}>+</button>
					<button className="buttonPlusMinus" onClick={this.subHealth}>-</button>
				</div>
				<br/>

				Armor Class: {ac}<br/>
				Initiative: {init}<br/>
				Saving Throws:
				Strength: {strength}<br/>
				Dexterity: {dex}<br/>
				Constitution: {con}<br/>
				Wisdom: {wis}<br/>
				Intelligence: {intel}<br/>
				Charisma: {cha}<br/>
			</div>
		)
	}
}

let mapStateToProps=(state)=>{
	let {name, health, ac, init, strength, dex, con, wis, intel, cha, curHealth, healthChangeVal, battleId }=state.player;
	return {
		name, health, ac, init, strength, dex, con, wis, intel, cha, curHealth, healthChangeVal, battleId, login:state.shared.login
	}
}

export default socketConnect(connect(mapStateToProps, {changeHealth, setHealthChangeVal})(CombatPage))