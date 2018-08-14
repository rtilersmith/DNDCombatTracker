import React from 'react'
import CombatantList from '../CombatantList/CombatantList'
import AddEnemies from '../AddEnemies/AddEnemies'
import { connect } from 'react-redux'

function GMSetUp(props){
	return(
		<div>
		{console.log(props.combatants.length)}
			GMSetUp
			<AddEnemies />
			{props.combatants.length>0?
			props.combatants.map(c=>{
				return(	
				<CombatantList combatant={c}/>)
				})
			:<div>No combatants</div>}
		</div>
	)
}

function mapStateToProps(state){
	return {
		combatants: state.shared.combatants
	}
}

export default connect(mapStateToProps)(GMSetUp)