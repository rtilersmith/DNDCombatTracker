import React, { Component } from 'react'
import CombatantList from '../CombatantList/CombatantList'
import AddEnemies from '../AddEnemies/AddEnemies'
import CustomEnemy from '../CustomEnemy/CustomEnemy'
import { connect } from 'react-redux'
import { dropCombatant, getCombatants } from '../../Ducks/gm'
import { socketConnect } from 'socket.io-react' 
// import io from 'socket.io-client'


class GMSetUp extends Component{
	componentDidMount(){
		this.props.getCombatants()
	}

	numGenerator=()=>{
			return Math.random().toString(36).substr(2,9).toUpperCase()
	}

	render(){
		let { socket } = this.props
		let battleId = this.numGenerator()
		socket.emit('join', {battle:battleId})
		return(
			<div>
				<h2>Your battle ID is: {battleId}</h2>
				<AddEnemies />
				<h3>Got a custom enemy?</h3>
				<CustomEnemy />
				<h2>Combatants</h2>
				{this.props.combatants.length>0?
				this.props.combatants.map((c, i)=>{
					return(	
					<div key={i}>
						<CombatantList combatant={c}/>
						<button onClick={()=>this.props.dropCombatant(c)}>Remove</button>
					</div>
				)
					})
				:<div>No combatants</div>}
			</div>
		)
	}
}

function mapStateToProps(state){
	return {
		combatants: state.gm.combatants
	}
}

export default socketConnect(connect(mapStateToProps, { dropCombatant, getCombatants })(GMSetUp))