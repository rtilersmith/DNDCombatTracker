import React, { Component } from 'react'
import { connect } from 'react-redux'
import onClickOutside from 'react-onclickoutside'


class CombatatantList extends Component{
	constructor(){
		super()
		this.state={
			initiative:0,
			inputInit:'',
			selected:false
		}
	}


	handleClickOutside=event=>{
		this.setState({
		  selected: false
		})
	  }

	changeInit=()=>{
		let base= this.props.combatant.initiative;
		let num = +this.state.inputInit
		let initiative=base+ num;
		this.setState({
			initiative,
			inputInit:''
		})
		
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
	}

	toggle=()=>{
		this.setState({
			selected: !this.state.selected
		})
	}

	render(){
		
		let { name, initiative, ac, strength, dex, con, wis, intel, cha, hp, current_hp } = this.props.combatant
		console.log(this.props.combatant.current_init)
		return (
			<div>
				<div><button onClick={this.toggle} style={styles.button}><h3>{name}</h3></button>
				</div>
			{!this.state.selected?
				<div>
					<br/>
					Initiative: {this.state.initiative> initiative? this.state.initiative: initiative}
					<input type='number' value={this.state.inputInit} onChange={(e)=>this.setInit(e.target.value)}/><button onClick={this.changeInit}>Submit initiative roll</button>
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
						</p>

					</div>
					<div>
						<h4>Saving Throws</h4>
						<p><b>Strength:</b>{strength}<b>Dexterity:</b>{dex}<b>Constitution:</b>{con}<b>Wisdom:</b>{wis}<b>Intelligence:</b>{intel}<b>Charisma:</b>{cha}
						</p>
					</div>

				</div>}
			</div>
			
		)
	}
}



export default connect(null)(onClickOutside(CombatatantList))

let styles = {
	button: {
		textDecoration:'none',
		border:'none',
		fontStyle:'bold',
		fontSize:'100%',
	}
}