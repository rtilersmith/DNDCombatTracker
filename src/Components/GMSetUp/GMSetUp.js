import React, { Component } from 'react'
import CombatantList from '../CombatantList/CombatantList'
import AddEnemies from '../AddEnemies/AddEnemies'
import CustomEnemy from '../CustomEnemy/CustomEnemy'
import { connect } from 'react-redux'
import { dropCombatant, getCombatants, addCombatant, updateBattleId } from '../../Ducks/gm'
import { socketConnect } from 'socket.io-react' 
import axios from 'axios'
// import io from 'socket.io-client'


class GMSetUp extends Component{
	constructor(){
		super()
		this.state={
			battleId:''
		}
	}


	componentDidMount=()=>{
		let {getCombatants, socket, addCombatant, history } = this.props
		socket.on('no user', function(){
			history.push('/')
			
		})
		socket.emit('join')
		let settingState=function(resp){
			this.setState({
				battleId: resp.battle
			})
			getCombatants(this.state.battleId)
		}
		let bound = settingState.bind(this)
		socket.on('battle', bound)


		socket.on('added', function(player){
			addCombatant(player)
		})

		socket.on('playerHealth', function(player){
		getCombatants(this.state.battleId)
		})
		
	}
	
	render(){
		let {battleId, combatants, dropCombatant}=this.props
		return(
			<div>
				<h2>Your battle ID is: {this.state.battleId}</h2>
				<AddEnemies room={this.state.battleId}/>
				<h3>Got a custom enemy?</h3>
				<CustomEnemy room={this.state.battleId}/>
				<h2>Combatants</h2>
				{combatants.length>0?
				combatants.map((c, i)=>{
					return(	
					<div key={i}>
						<CombatantList combatant={c} battleId={battleId}/>
						<button onClick={()=>dropCombatant(c, battleId=this.state.battleId)}>Remove</button>
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