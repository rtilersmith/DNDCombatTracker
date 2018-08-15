import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getEnemies } from '../../Ducks/gm'
import CustomEnemy from '../CustomEnemy/CustomEnemy'

class AddEnemies extends Component{
	componentDidMount(){
		this.props.getEnemies()
	}
	
	render(){
		return (
			<div>
				List goes here: Don't put code here until you can have a scrolling list.
				<h3>Got a custom enemy?</h3>
				<CustomEnemy />
			</div>
		)
	}
}

let mapStateToProps=(state)=>{
	return {
		enemies:state.gm.enemies
	}
}

export default connect(mapStateToProps, {getEnemies} )(AddEnemies)