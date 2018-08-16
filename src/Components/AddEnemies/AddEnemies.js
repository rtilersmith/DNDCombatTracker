import React, { Component } from 'react'
import { connect } from 'react-redux'
import onClickOutside from 'react-onclickoutside'
import { getEnemies, addEnemy } from '../../Ducks/gm'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { faAngleUp, faAngleDown } from '@fortawesome/free-solid-svg-icons'

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
       {list.map((enemy, i) => (
		 <li className="dd-list-item" key={enemy.name} style={styles.item}>
		 <button onClick={()=>addEnemy(i+1)} style={styles.button}>
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