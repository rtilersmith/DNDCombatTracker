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
		return(
			<div>
				GMSetUp
				<AddEnemies />
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

export default connect(mapStateToProps, { dropCombatant, getCombatants })(GMSetUp)