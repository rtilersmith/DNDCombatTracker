import React from 'react'
import CombatantList from '../CombatantList/CombatantList'
import AddEnemies from '../AddEnemies/AddEnemies'

export default function GMSetUp(props){
	return(
		<div>
			GMSetUp
			<AddEnemies />
			<CombatantList />
		</div>
	)
}