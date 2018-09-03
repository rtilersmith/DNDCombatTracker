import React, { Component } from 'react'
import { connect } from 'react-redux'
import axios from 'axios'
import onClickOutside from 'react-onclickoutside'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleUp, faAngleDown } from '@fortawesome/free-solid-svg-icons'

import { getEnemies, addEnemy } from '../../Ducks/gm'

class AddEnemies extends Component{
	constructor(props){
		super(props)
		this.state={
			listOpen:false,
			headerTitle: 'Select Enemies'
		}
	}

	handleClickOutside=event=>{
		this.setState({
		  listOpen: false
		})
	  }

	componentDidMount(){
		this.props.getEnemies()
	}

	toggleList(){
		this.setState(prevState => ({
		  listOpen: !prevState.listOpen
		}))
	}

	addMonster = (name) => {
	axios.get(`/api/monsters/${name}`/* ---No longer usable due to not secure link---`http://www.dnd5eapi.co/api/monsters/${id}`*/).then((res)=>{
			function mods(type){
				return Math.floor((type-10)/2)
			}
			let { name, armor_class, constitution, constitution_save, dexterity, dexterity_save, intelligence, intelligence_save, strength_save, wisdom, wisdom_save, charisma, charisma_save, hit_points} = res.data
			
			let ac=armor_class;
			
			let health=hit_points;
			
			let strength= strength_save? strength_save: mods(res.data.strength)
			
			let con= constitution_save? constitution_save: mods(constitution)
			
			let dex= dexterity_save? dexterity_save: mods(dexterity)
			
			let wis= wisdom_save? wisdom_save: mods(wisdom)
			
			let intel= intelligence_save? intelligence_save: mods(intelligence)
			
			let cha= charisma_save? charisma_save: mods(charisma)
			
			let init=mods(dexterity)
			
			let { room, addEnemy} = this.props
			
			let enemy= {name, ac, health, strength, con, dex, wis, intel, cha, init, room};
			addEnemy(enemy)
			alert(`${name} has been added`)
		}).catch(error=>{alert('an error has occured:', error)})
	}
	
	render(){
		const list = this.props.enemies
		const{listOpen, headerTitle} = this.state
		return (
			<div>
				    <div className="dd-wrapper" style={styles.wrapper}>
    <div className="dd-header" onClick={() => this.toggleList()} style={styles.header}>
        <div className="dd-header-title">{headerTitle}</div>
        {listOpen
          ? <FontAwesomeIcon icon={faAngleUp} size="2x"/>
          : <FontAwesomeIcon icon={faAngleDown} size="2x"/>
        }
    </div>
     {listOpen && <ul className="dd-list" style={styles.list}>
       {list.map((enemy) => (
		 <li className="dd-list-item" key={enemy.name} style={styles.item}>
		 <button onClick={()=>this.addMonster(enemy.name)} style={styles.button}>
		 {enemy.name}
		 </button>
		 </li>
        ))}
      </ul>}
    </div>

			</div>
		)
	}
}

let mapStateToProps=(state)=>{
	return {
		enemies:state.gm.enemies
	}
}

export default connect(mapStateToProps, {getEnemies, addEnemy} )(onClickOutside(AddEnemies))

let styles ={
	wrapper: {
		width:'20%',
		display:'flex',
		flexDirection:'column',
		justifyContent:'center',
		margin:'0 auto',
	},
	header: {
		display:'flex',
		flexDirection:'row',
		justifyContent:'space-around',
		alignItems: 'center',
		border:'1px solid black',
		marginBottom:0
	},
	list: {
		maxHeight:'100px',
		overflow: 'scroll',
		listStyleType: 'none',
		border:'1px solid black',
		marginTop:0,
		paddingLeft:'2%',

	},
	item: {
		marginBottom:'3px',
		marginTop:'2px'
	},
	button: {
		textDecoration:'none',
		border:'none',
		fontStyle:'normal',
		fontSize:'90%',
		textAlign:'left',
		width:'100%'
	}
}