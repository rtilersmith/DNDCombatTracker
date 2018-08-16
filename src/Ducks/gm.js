import axios from 'axios'


const initialState = {
	selected:[],
	combatants:[],
	enemies:[],
}

const FULFILLED = '_FULFILLED'
const SET_SELECTED = 'SET_SELECTED'
const ADD_COMBATANT='ADD_COMBATANT'
const DROP_COMBATANT='DROP_COMBATANT'
const GET_COMBATANTS='GET_COMBATANTS'
const GET_ENEMIES='GET_ENEMIES'
const ADD_ENEMY='ADD_ENEMY'


export default function reducer (state = initialState, action){
	switch (action.type) {

		case GET_ENEMIES+FULFILLED:
		return { ...state, enemies:action.payload.data.results}

		case SET_SELECTED:
		return {...state, selected: [action.payload]}

		case ADD_COMBATANT+FULFILLED:
		return {...state, combatants: [...state.combatants, action.payload]}

		case DROP_COMBATANT+FULFILLED:
		return { ...state, combatants: action.payload.data}

		case GET_COMBATANTS+FULFILLED:
		return { ...state, combatants: action.payload.data}

		case ADD_ENEMY+FULFILLED:
		return {...state, combatants: [...state.combatants, action.payload]}

		default:
		return state;
	}
}

export function selected(combatant){
	return{
		type: SET_SELECTED,
		payload: combatant
	}
}

export function dropCombatant(combatant){
	let { id } = combatant
	
	return {
		type: DROP_COMBATANT,
		payload: axios.delete(`/api/combatant/${id}`)
	}
}

export function addCombatant(obj){
	return {
		type: ADD_COMBATANT,
		payload: axios.post('api/combatants', obj)
	}
}

export function getCombatants(){
	return {
		type: GET_COMBATANTS,
		payload: axios.get('/api/combatants')
	}
}

export function getEnemies(){
	return {
		type: GET_ENEMIES,
		payload: axios.get('http://www.dnd5eapi.co/api/monsters/')
	}
}

export let addEnemy=async (num)=>{
	let enemy= await axios.get(`http://www.dnd5eapi.co/api/monsters/${num}`).then((res)=>{
		return (
			res.data
		)
	})
	console.log(enemy)
	let { name, armor_class, constitution, constitution_save, dexterity, dexterity_save, intelligence, intelligence_save, strength_save, wisdom, wisdom_save, charisma, charisma_save, hit_points} = enemy
	let ac=armor_class;
	let hp=hit_points;
	let strength= strength_save? strength_save: ((enemy.strength-10)/2)
	let con= constitution_save? constitution_save: ((constitution-10)/2)
	let dex= dexterity_save? dexterity_save: ((dexterity-10)/2)
	let wis= wisdom_save? wisdom_save: ((wisdom-10)/2)
	let intel= intelligence_save? intelligence_save: ((intelligence-10)/2)
	let cha= charisma_save? charisma_save: ((charisma-10)/2)
	let init=(dexterity-10)/2
	let newEnemy={name, ac, hp, strength, con, dex, wis, intel, cha, init}
	// return {
	// 	type: ADD_ENEMY,
	// 	payload: axios.post('api/combatants', newEnemy)
	// }
}