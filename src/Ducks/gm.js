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
const UPDATE_HP='UPDATE_HP'
const UPDATE_INIT='UPDATE_INIT'


export default function reducer (state = initialState, action){
	switch (action.type) {

		case GET_ENEMIES+FULFILLED:
		return { ...state, enemies:action.payload.data.results}

		case SET_SELECTED:
		return {...state, selected: [action.payload]}

		case ADD_COMBATANT+FULFILLED:
		return {...state, combatants: [...state.combatants, action.payload.data]}

		case DROP_COMBATANT+FULFILLED:
		return { ...state, combatants: action.payload.data}

		case GET_COMBATANTS+FULFILLED:
		return { ...state, combatants: action.payload.data}

		case ADD_ENEMY+FULFILLED:
		return {...state, combatants: [...state.combatants, action.payload.data]}

		case UPDATE_HP+FULFILLED:
		return {...state, combatants: [...state.combatants, action.payload.data]}

		case UPDATE_INIT+FULFILLED:
		return {...state, combatants: [...state.combatants, action.payload.data]}

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

export let addEnemy= (enemy)=>{

	return {
		type: ADD_ENEMY,
		payload: axios.post('api/combatants', enemy)
	}
}

export function updateHp(id, obj){
	return {
		type:UPDATE_HP,
		payload:axios.put(`api/combatant/${id}`,obj)
	}
}
export function updateInit(id, obj){
	return {
		type:UPDATE_INIT,
		payload:axios.put(`api/combatant/${id}`,obj)
	}
}