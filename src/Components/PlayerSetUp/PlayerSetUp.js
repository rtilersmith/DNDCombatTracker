import React, { Component } from 'react'
import { connect } from 'react-redux'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { setName, setHealth, setAc, setInit, setStrength, setDex, setCon, setWis, setIntel, setCha } from '../../Ducks/player'
import { socketConnect } from 'socket.io-react' 


class PlayerSetUp extends Component {
	constructor(){
		super()
		this.state={
			battleId:'',
			lastBattleId:'',
			healthChange:0,
			connected:false,
			checked:false,
			player:{}
		}
	}

	componentDidMount(){
		axios.get('/api/loginCheck').then(res=>{
			if(!res.data){
				this.props.history.push('/')
			}
		})
	}

	handleSubmit = (e)=>{
		e.preventDefault();
		let { socket, player, history } = this.props;
		let { name, health, ac } = player;
		let room = this.state.battleId
		if (name && health && ac && room){
			socket.emit('added', {...player, room}) 
			history.push('/combat')
		} else {
			alert("You must have name, health, and AC values for your character")
		}
	}

	handleId=(e)=>{
		this.setState({
			battleId:e.target.value,
		})
	}

	socket=()=>{
		let {battleId, lastBattleId} = this.state
		let { socket } = this.props
		if(battleId){
			if(battleId !== lastBattleId  && lastBattleId){
				socket.emit('leave', {battle:lastBattleId})
				socket.emit('playerJoin', {battle:battleId.toUpperCase()})
			} else{
				socket.emit('playerJoin', {battle:battleId.toUpperCase()})
			} 	
			this.setState({
				lastBattleId:battleId
			})
		}
	}
	connect=()=>{
		this.setState({
			connected:!this.state.connected
		})
	}


	returning=(e)=>{
		e.preventDefault();
		let room = this.state.battleId
		let { setHealth, setAc, setInit, setStrength, setDex, setCon, setWis, setIntel, setCha, player } = this.props;
		let {name}=player;
		if (name){
			axios.post('api/player', {name, room}).then(resp=>{
				let {ac, cha, con, hp, initiative, dex, str, wis, int} = resp.data
				alert('player found', resp.data.name)
				setAc(ac);
				setCha(cha);
				setCon(con);
				setHealth(hp);
				setInit(initiative);
				setDex(dex);
				setStrength(str);
				setWis(wis);
				setIntel(int);
			}).catch(error=>{alert('Could not get player', error)})
		}
	}
	
	render(){
		let { setName, setHealth, setAc, setInit, setStrength, setDex, setCon, setWis, setIntel, setCha } = this.props;
		return (
			<div>
				{!this.state.connected?
					<div>
						Connect your battleId first<input value={this.state.battleId} onChange={this.handleId}/>
						<button onClick={()=>{this.socket();this.connect()}}>Connect</button>
					</div>
				:
					
					<div>
						<div>
							Returning Player? <input type='checkbox' onClick={()=>{this.setState({checked:!this.state.checked})}}/>
						</div>
						{this.state.checked?
						<div>
							<form onSubmit={this.returning} name='returnForm'>
								<input placeholder="Player Name" type='text' onChange={(e)=>setName(e.target.value)}/>
								<button>Confirm</button>
							</form>
							<Link to="/combat" player={this.state.player}>Submit</Link>
						</div>
						:
						<form onSubmit={this.handleSubmit} name='playerForm' className='playerForm'>
							<input placeholder="Player Name" type='text'
							onChange={(e)=>setName(e.target.value)}
							/>
							<br/>	
							<input placeholder="Health" type='number' onChange={(e)=>{setHealth(e.target.value)}}/>	
							<input placeholder="Armor Class" type='number' onChange={(e)=>setAc(e.target.value)}/>
							<input placeholder="Initiative Bonus" type='number' onChange={(e)=>setInit(e.target.value)}/>	
							<br/>	
							<p>Saving Throw Modifiers:</p>
							<input placeholder="Strength" type='number' onChange={(e)=>setStrength(e.target.value)}/>	
							<input placeholder="Dexterity" type='number' onChange={(e)=>setDex(e.target.value)}/>
							<br/>	
							<input placeholder="Constitution" type='number' onChange={(e)=>setCon(e.target.value)}/>	
							<input placeholder="Wisdom" type='number' onChange={(e)=>setWis(e.target.value)}/>	
							<br/>
							<input placeholder="Intelligence" type='number' onChange={(e)=>setIntel(e.target.value)}/>	
							<input placeholder="Charisma" type='number' onChange={(e)=>setCha(e.target.value)}/>	
							<input type='submit' value="Ready?"/>
						</form>
					}
					</div>
				}
			</div>
		)
	}
}

let mapStateToProps = (state)=>{ return { player:state.player, login:state.shared.login } }

export default socketConnect(connect(mapStateToProps,{ setName, setHealth, setAc, setInit, setStrength, setDex, setCon, setWis, setIntel, setCha })(PlayerSetUp))

// let styles= {
// 	name: {
// 		width: '300px',
// 		fontSize: '3em',
// 		// margin:'0 auto',
// 		// display:'flex',
// 		// justifyContent:'center'
// 	}
// }