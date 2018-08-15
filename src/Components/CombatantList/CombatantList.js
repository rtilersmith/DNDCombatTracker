import React, { Component } from 'react'
import { connect } from 'react-redux'

class CombatatantList extends Component{
	constructor(){
		super()
		this.state={
			initiative:0,
			inputInit:''
		}
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

	render(){
		let { name, initiative } = this.props.combatant
	return (
		<div>
			<div>
				<h5>{name}</h5>
				<br/>
				Initiative: {this.state.initiative> initiative? this.state.initiative: initiative}
				<input type='number' value={this.state.inputInit} onChange={(e)=>this.setInit(e.target.value)}/><button onClick={this.changeInit}>Submit initiative roll</button>
				<button onClick={this.resetInit}>Reset Initiative</button>
			</div>
		</div>
	)
	}
}



export default connect(null)(CombatatantList)