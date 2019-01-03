import React, { Component } from 'react'
import { connect } from 'react-redux'
import onClickOutside from 'react-onclickoutside'
import { updateInit, updateHp } from '../../Ducks/gm'
import { socketConnect } from 'socket.io-react' 
// import io from 'socket.io-client'

class CombatatantList extends Component{
	constructor(props){
		super(props)
		this.state={
			initiative:this.props.combatant.current_init,
			inputInit:"",
			selected:false,
			healthChange:""
		}
	}

	addHealth = ()=>{
		let { healthChange } = this.state
		let { socket, updateHp, combatant } = this.props;
		let { name, current_hp, room } = combatant
		let health = +current_hp + +healthChange
		updateHp(combatant.id, {health, room} ).then(res=>{
			socket.emit('gmHealth', {name, change: +health})
			this.setState({ healthChange:"" })
		})
	}

	subHealth = ()=>{
		let { socket, updateHp, combatant } = this.props;
		let { name, current_hp, room } = combatant
		let neg = -( +this.state.healthChange)
		let health = +current_hp + neg
		updateHp(combatant.id, {health, room} ).then(res=>{
			socket.emit('gmHealth', {name, change: +health})
			this.setState({ healthChange:"" })
		})
	}

	handleClickOutside=event=>{ this.setState({ selected: false })
	}

	changeInit=()=>{
		let { inputInit } = this.state;
		let { initiative, room } = this.props.combatant
		let num = +inputInit > 0 ? Number(inputInit) + +initiative : +initiative;
		this.props.updateInit(this.props.combatant.id,{init: +num, room})
		this.setState({
			inputInit:''
		})
	}

	setInit=(n)=>{ this.setState({ inputInit: +n })
	}

	resetInit=()=>{ this.setState({ initiative: +this.props.combatant.initiative })
		this.changeInit() 
	}

	toggle=()=>{ this.setState({ selected: !this.state.selected })
	}

	stateHealth=(num)=>{this.setState({healthChange: +num})}

	render(){
		let { combatant, deleteButton } = this.props;
		let { name, initiative, ac, str, dex, con, wis, intel, cha, hp, current_hp, current_init} = combatant
		return (
			<div>
				<span><button onClick={this.toggle}><h3>{name}</h3></button>
				Initiative: { current_init }
				{current_init === initiative? 
				<span>
					<input type='number' value={this.state.inputInit} onChange={(e)=>this.setInit(e.target.value)}/>
					<button onClick={this.changeInit}>Submit initiative roll</button>
				</span>
				:
				<button onClick={this.resetInit}>Reset Initiative</button>
				}
				</span>
			{!this.state.selected?
				<div>
					<br/>
					{deleteButton}
				</div>

				:

				<div>
					<div>
						<p><b>Armor Class:</b>{ac}
						<b>Initiative:</b>{initiative}
						<b>Health:</b>
						<b>Max</b>{hp}
						<b>Current</b>{current_hp}
						<input value={this.state.healthChange} onChange={(e)=>{this.stateHealth(e.target.value)
						}}/>
						<button onClick={this.addHealth}>+</button>
						<button onClick={this.subHealth}>-</button>
						</p>

					</div>
					<div>
						<h4>Saving Throws</h4>
						<p><b>Strength:</b>{str}  <b>Dexterity:</b>{dex}   <b>Constitution:</b>{con}  <b>Wisdom:</b>{wis}  <b>Intelligence:</b>{intel}  <b>Charisma:</b>{cha}
						</p>
					</div>

				</div>}
			</div>
			
		)
	}
}

export default socketConnect(connect(null, { updateHp, updateInit })(onClickOutside(CombatatantList)))

let styles = {
	button: {
		textDecoration:'none',
		border:'none',
		fontStyle:'bold',
		fontSize:'100%',
	}
}