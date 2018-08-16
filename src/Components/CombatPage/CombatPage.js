import React, { Component } from 'react'
import { connect } from 'react-redux'
import { changeHealth } from '../../Ducks/player'

class CombatPage extends Component{
	render(props){
		let {name, health, ac, init, strength, dex, con, wis, intel, cha, curHealth}=this.props
		return (
			<div>
				{name}<br/>
				{health}<br/>
				{ac}<br/>
				{init}<br/>
				{strength}<br/>
				{dex}<br/>
				{con}<br/>
				{wis}<br/>
				{intel}<br/>
				{cha}<br/>
				{curHealth}<br/>

			</div>
		)
	}
}

let mapStateToProps=(state)=>{
	let {name, health, ac, init, strength, dex, con, wis, intel, cha, curHealth}=state.player
	return {
		name, health, ac, init, strength, dex, con, wis, intel, cha, curHealth,
		gmView: state.gm.curHealth
	}
}

export default connect(mapStateToProps, {changeHealth})(CombatPage)