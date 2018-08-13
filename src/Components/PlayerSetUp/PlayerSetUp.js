import React, { Component } from 'react'

class PlayerSetUp extends Component {
	render(props){
		return (
			<div>
				<form>
				<input placeholder="NAME" type='text' style={styles.name}/>
				<br/>	
				<input placeholder="Health" type='number' />	
				<input placeholder="Armor Class" type='number' />
				<input placeholder="Initiative Bonus" type='number' />	
				<br/>	
				<p>Saving Throw Modifiers:</p>
				<input placeholder="Strength" type='number' />	
				<input placeholder="Dexterity" type='number' />	
				<input placeholder="Constitution" type='number' />	
				<input placeholder="Wisdom" type='number' />	
				<input placeholder="Intelligence" type='number' />	
				<input placeholder="Charisma" type='number' />	
				</form>
			</div>
		)
	}
}

export default PlayerSetUp

let styles= {
	name: {
		width: '300px',
		fontSize: '3em',
		// margin:'0 auto',
		// display:'flex',
		// justifyContent:'center'
	}
}