import React, { Component } from 'react'
import CombatantList from '../CombatantList/CombatantList'
import AddEnemies from '../AddEnemies/AddEnemies'
import CustomEnemy from '../CustomEnemy/CustomEnemy'
import { connect } from 'react-redux'
import { dropCombatant, getCombatants, addEnemy, updateBattleId } from '../../Ducks/gm'
import { socketConnect } from 'socket.io-react' 
// import io from 'socket.io-client'


class GMSetUp extends Component{
	constructor(){
		super()
		this.state={
			battleId:''
		}
	}


	componentDidMount=()=>{
		let {getCombatants, socket, addEnemy } = this.props
		axios.get('/api/loginCheck').then(res=>{
			if(!res.data){
				history.push('/')
			}
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
			addEnemy(player)
		})

		socket.on('playerHealth', function(battle){
		getCombatants(battle)
		})
		
		socket.on('gmHealth', function(battle){
			getCombatants(battle)
		})

		socket.on('returnPlayer', function(battle){
			getCombatants(battle)
		})
	}
	
	render(){
		let {battleId, combatants, dropCombatant}=this.props
		return(
			<div>
				<h3>Your battle ID is: {this.state.battleId}</h3>
				<div className="selectEnemy">
				<AddEnemies room={this.state.battleId}/>
				</div>
				<h2>Got a custom enemy?</h2>
				<CustomEnemy room={this.state.battleId}/>
				<h2>Combatants</h2>
				{combatants.length>0?
				combatants.map((c, i)=>{
					return(	
					<div key={i}>
						<CombatantList combatant={c} deleteButton={<button onClick={()=>dropCombatant(c, battleId)}>Remove</button> }/>
						
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
		battleId,
		login:state.shared.login
	}
}

export default socketConnect(connect(mapStateToProps, { dropCombatant, getCombatants, addEnemy, updateBattleId })(GMSetUp))