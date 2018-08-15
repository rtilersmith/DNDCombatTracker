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
		let base= +this.props.combatant.init;
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
		console.log(this.state.inputInit)
	}

	render(){
		let { name, init } = this.props.combatant
	return (
		<div>
			<div>
				combatant: {name}
				<br/>
				Initiative: {this.state.initiative>init?this.state.initiative:init}
				<input type='number' value={this.state.inputInit} onChange={(e)=>this.setInit(e.target.value)}/><button onClick={this.changeInit}>Submit initiative roll</button>
			</div>
		</div>
	)
	}
}





export default connect(null)(CombatatantList)