import React from 'react'
import CombatantList from '../CombatantList/CombatantList'
import AddEnemies from '../AddEnemies/AddEnemies'
import { connect } from 'react-redux'

function GMSetUp(props){
	return(
		<div>
			GMSetUp
			<AddEnemies />
			{props.combatants.length>0?
			props.combatants.map((c, i)=>{
				return(	
				<CombatantList key={i} combatant={c}/>)
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