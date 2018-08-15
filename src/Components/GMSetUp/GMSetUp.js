import React, { Component } from 'react'
import CombatantList from '../CombatantList/CombatantList'
import AddEnemies from '../AddEnemies/AddEnemies'
import { connect } from 'react-redux'
import { dropCombatant, getCombatants } from '../../Ducks/gm'


class GMSetUp extends Component{
	componentDidMount(){
		this.props.getCombatants()
	}
	render(){
		console.log('combatants', this.props.combatants)
		return(
			<div>
				GMSetUp
				<AddEnemies />
				{this.props.combatants.length>0?
				this.props.combatants.map((c)=>{
					console.log(c)
					return(	
					<div>
						<CombatantList key={c.id} combatant={c}/>
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
	console.log('map', state.gm)
	return {
		combatants: state.gm.combatants
	}
}

export default connect(mapStateToProps, { dropCombatant, getCombatants })(GMSetUp)