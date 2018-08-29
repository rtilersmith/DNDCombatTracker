import React, { Component } from 'react'
import { connect } from 'react-redux'
import { changeHealth } from '../../Ducks/player'
import { socketConnect } from 'socket.io-react' 
// import io from 'socket.io-client'


class CombatPage extends Component{


	addHealth = ()=>{
		this.props.socket.emit('playerHealth', {name:this.props.name, change:this.state.healthChange})
	}

	subHealth = ()=>{
		let neg = -(this.state.healthChange)
		this.props.socket.emit('playerHealth', {name:this.props.name, change:neg})
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
				Current Health:{curHealth}<input type='number' onChange={this.handleNum}/><button onClick={this.addHealth}>add</button><br/>
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
		name, health, ac, init, strength, dex, con, wis, intel, cha, curHealth,
		gmView: state.gm.curHealth
	}
}

export default socketConnect(connect(mapStateToProps, {changeHealth})(CombatPage))