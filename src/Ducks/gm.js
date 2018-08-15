import axios from 'axios'


const initialState = {
	selected:[],
	combatants:[]
}

const FULFILLED = '_FULFILLED'
const SET_SELECTED = 'SET_SELECTED'
const ADD_COMBATANT='ADD_COMBATANT'
const DROP_COMBATANT='DROP_COMBATANT'
const GET_COMBATANTS='GET_COMBATANTS'


export default function reducer (state = initialState, action){
	switch (action.type) {

		case SET_SELECTED:
		return {...state, selected: [action.payload]}

		case ADD_COMBATANT+FULFILLED:
		return {...state, combatants: [...state.combatants, action.payload]}

		case DROP_COMBATANT:
		return { ...state, combatants: [action.payload]}

		case GET_COMBATANTS+FULFILLED:
		return { ...state, combatants: action.payload.data}

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
	axios.delete(`/api/combatant/${id}`)
	return {
		type: DROP_COMBATANT,
		payload: id
	}
}

export function addCombatant(obj){
	return {
		type: ADD_COMBATANT,
		payload: axios.post('api/combatant', obj)
	}
}

export function getCombatants(){
	console.log('into redux we go')
	return {
		type: GET_COMBATANTS,
		payload: axios.get('/api/combatants')
	}
}