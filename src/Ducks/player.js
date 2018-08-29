const initialState = {
	name: '',
	health: 0,
	ac: 0,
	init: 0,
	strength: 0,
	dex: 0,
	con: 0,
	wis: 0,
	intel: 0,
	cha: 0,
	curhealth: 0
}

const SET_NAME = 'SET_NAME'
const SET_HEALTH = 'SET_HEALTH'
const SET_AC = 'SET_AC'
const SET_INIT = 'SET_INIT'
const SET_STRENGTH = 'SET_STRENGTH'
const SET_DEX = 'SET_DEX'
const SET_CON = 'SET_CON'
const SET_WIS = 'SET_WIS'
const SET_INTEL = 'SET_INTEL'
const SET_CHA = 'SET_CHA'
const CHANGE_CURHEALTH = 'CHANGE_CURHEALTH'

export default function reducer(state = initialState, action){
	switch (action.type) {
		case SET_NAME:
		return {...state, name:action.payload};
		case SET_HEALTH:			
		return {...state, health:action.payload, curHealth:action.payload};
		case SET_AC:
		return {...state, ac:action.payload};
		case SET_INIT:
		return {...state, init:action.payload};
		case SET_STRENGTH:
		return {...state, strength:action.payload};
		case SET_DEX:
		return {...state, dex:action.payload};
		case SET_CON:
		return {...state, con:action.payload};
		case SET_WIS:
		return {...state, wis:action.payload};
		case SET_INTEL:
		return {...state, intel:action.payload};
		case SET_CHA:
		return {...state, cha:action.payload};
		case CHANGE_CURHEALTH:
		return console.log(action.payload);

		default:
			return state;
	}
}

export function name(name) {
	return {
		type: SET_NAME,
		payload: name
	}
}

export function health(health) {
	return {
		type: SET_HEALTH,
		payload: +health
	}
}

export function ac(ac) {
	return {
		type: SET_AC,
		payload: +ac
	}
}

export function init(init) {
	return {
		type: SET_INIT,
		payload: +init
	}
}

export function strength(strength) {
	return {
		type: SET_STRENGTH,
		payload: +strength
	}
}

export function dex(dex) {
	return {
		type: SET_DEX,
		payload: +dex
	}
}

export function con(con) {
	return {
		type: SET_CON,
		payload: +con
	}
}

export function wis(wis) {
	return {
		type: SET_WIS,
		payload: +wis
	}
}

export function intel(intel) {
	return {
		type: SET_INTEL,
		payload: +intel
	}
}

export function cha(cha) {
	return {
		type: SET_CHA,
		payload: +cha
	}
}

export function changeHealth(num){
	return {
		type:CHANGE_CURHEALTH,
		payload: num
	}
}