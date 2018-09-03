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
			inputInit:0,
			selected:false,
			healthChange:0
		}
	}

	addHealth = ()=>{
		let { healthChange } = this.state
		let { socket, updateHp, curHealth, combatant } = this.props;
		let { name } = combatant
		let change = +curHealth + +healthChange
		updateHp(combatant.id, {change} )
		socket.emit('gmHealth', { name, change:healthChange })
		this.setState({ healthChange:0 })
	}

	subHealth = ()=>{
		let { socket, updateHp, curHealth, combatant } = this.props;
		let { name } = combatant
		let neg = -( +this.state.healthChange)
		let change = +curHealth + neg
		updateHp(combatant.id, {change} )
		socket.emit('gmHealth', {name, change:neg})
		this.setState({ healthChange:0 })
	}

	handleClickOutside=event=>{ this.setState({ selected: false })
	}

	changeInit=()=>{
		let { inputInit, initiative } = this.state;
		let num = inputInit!==0?inputInit + initiative: initiative
		this.props.updateInit(this.props.combatant.id,{"current_init":num})	
	}

	setInit=(n)=>{ this.setState({ inputInit: n })
	}

	resetInit=()=>{ this.setState({ initiative:this.props.combatant.initiative })
		this.changeInit() 
	}

	toggle=()=>{ this.setState({ selected: !this.state.selected })
	}

	stateHealth=(num)=>{this.setState({healthChange:num})}

	render(){
		let { combatant } = this.props;
		let { name, initiative, ac, str, dex, con, wis, intel, cha, hp, current_hp, current_init} = combatant
		return (
			<div>
				<div><button onClick={this.toggle} style={styles.button}><h3>{name}</h3></button>
				Initiative: {current_init> initiative? current_init: initiative}
				<input type='number' value={this.state.inputInit} onChange={(e)=>this.setInit(e.target.value)}/><button onClick={this.changeInit}>Submit initiative roll</button>
				</div>
			{!this.state.selected?
				<div>
					<br/>
					<button onClick={this.resetInit}>Reset Initiative</button>
				</div>

				:

				<div>
					<div>
						<p><b>Armor Class:</b>{ac}
						<b>Initiative:</b>{initiative}
						<b>Health:</b>
						<b>Max</b>{hp}
						<b>Current</b>{current_hp}
						<input onChange={(e)=>{
						}}/>
						<button onClick={this.addHealth}>test</button>
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