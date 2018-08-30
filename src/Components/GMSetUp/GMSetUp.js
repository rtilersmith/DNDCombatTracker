import React, { Component } from 'react'
import CombatantList from '../CombatantList/CombatantList'
import AddEnemies from '../AddEnemies/AddEnemies'
import CustomEnemy from '../CustomEnemy/CustomEnemy'
import { connect } from 'react-redux'
import { dropCombatant, getCombatants, addCombatant, updateBattleId } from '../../Ducks/gm'
import { socketConnect } from 'socket.io-react' 
// import io from 'socket.io-client'


class GMSetUp extends Component{

	componentDidMount=()=>{
		let {getCombatants, socket, addCombatant, updateBattleId, battleId} = this.props
		socket.emit('join')
		socket.on('battle', function(resp){
			updateBattleId(resp.battle)
			getCombatants(battleId)
		})
		socket.on('added', function(player){
			addCombatant(player)
		})
	}
	
	render(){
		let {battleId, combatants, dropCombatant}=this.props
		return(
			<div>
				<h2>Your battle ID is: {battleId}</h2>
				<AddEnemies room={battleId}/>
				<h3>Got a custom enemy?</h3>
				<CustomEnemy room={battleId}/>
				<h2>Combatants</h2>
				{combatants.length>0?
				combatants.map((c, i)=>{
					return(	
					<div key={i}>
						<CombatantList combatant={c} battleId={battleId}/>
						<button onClick={()=>dropCombatant(c)}>Remove</button>
					</div>
				)
					})
				:<div>No combatants</div>}
			</div>
		)
	}
}

function mapStateToProps(state){
	let {combatants, battleId} = state.gm
	return {
		combatants,
		battleId
	}
}

export default socketConnect(connect(mapStateToProps, { dropCombatant, getCombatants, addCombatant, updateBattleId })(GMSetUp))