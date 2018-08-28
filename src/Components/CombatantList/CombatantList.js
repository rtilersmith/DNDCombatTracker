import React, { Component } from 'react'
import { connect } from 'react-redux'
import onClickOutside from 'react-onclickoutside'
import { updateInit, updateHp } from '../../Ducks/gm'
import axios from 'axios'
import { socketConnect } from 'socket.io-react' 
// import io from 'socket.io-client'

class CombatatantList extends Component{
	constructor(props){
		super(props)
		this.state={
			initiative:this.props.combatant.current_init,
			inputInit:0,
			selected:false
		}
	}

	componentDidMount(){
		this.props.socket.on('battle', function(player){
			console.log(player)
		})
	}

	handleClickOutside=event=>{
		this.setState({
		  selected: false
		})
	  }

	changeInit=()=>{
		let { inputInit, initiative } = this.state;
		let num = inputInit!==0?inputInit + initiative: initiative
		this.props.updateInit(this.props.combatant.id,{"current_init":num})
		
	}

	setInit=(n)=>{
		this.setState({
			inputInit: n
		})
	}

	resetInit=()=>{
		this.setState({
			initiative:this.props.combatant.initiative
		})
		this.changeInit()
	}

	toggle=()=>{
		this.setState({
			selected: !this.state.selected
		})
	}

	render(){
		let { socket } = this.props
		socket.on('start', function(/*more than on parameter must be an obj*/){

		})		
		let { name, initiative, ac, str, dex, con, wis, intel, cha, hp, current_hp, current_init, id } = this.props.combatant
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
						<button onClick={(id)=>{axios.put(`/api/combatant/${id}`, {name, current_hp}).then(resp=>{console.log(resp)})}}>test</button>
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