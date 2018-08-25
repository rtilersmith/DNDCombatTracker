import React, { Component } from 'react'
import { connect } from 'react-redux'
import { changeHealth } from '../../Ducks/player'

class CombatPage extends Component{

	render(props){
		let {name, health, ac, init, strength, dex, con, wis, intel, cha, curHealth}=this.props
		return (
			<div>
				Name:{name}<br/>
				Max Health:{health}<br/>
				Current Health:{curHealth}<br/>
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

export default connect(mapStateToProps, {changeHealth})(CombatPage)