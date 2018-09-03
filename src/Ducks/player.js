import axios from 'axios'
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
	curHealth: 0,
	healthChangeVal:'',
	battleId:''
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
const HEALTH_CHANGE_VAL = 'HEALTH_CHANGE_VAL'
const SET_BATTLE_ID = 'SET_BATTLE_ID'

export default function reducer(state = initialState, action){
	if(action.type===CHANGE_CURHEALTH + "_FULFILLED"){console.log(action.payload)}
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
		case CHANGE_CURHEALTH+'_FULFILLED':
		return {...state, curHealth:action.payload.data.current_hp};
		case HEALTH_CHANGE_VAL:
		return {...state, healthChangeVal:action.payload};
		case SET_BATTLE_ID:
		return {...state, battleId:action.payload}
		default:
			return state;
	}
}

export function setName(name) {
	return {
		type: SET_NAME,
		payload: name
	}
}

export function setHealth(health) {
	return {
		type: SET_HEALTH,
		payload: +health
	}
}

export function setAc(ac) {
	return {
		type: SET_AC,
		payload: +ac
	}
}

export function setInit(init) {
	return {
		type: SET_INIT,
		payload: +init
	}
}

export function setStrength(strength) {
	return {
		type: SET_STRENGTH,
		payload: +strength
	}
}

export function setDex(dex) {
	return {
		type: SET_DEX,
		payload: +dex
	}
}

export function setCon(con) {
	return {
		type: SET_CON,
		payload: +con
	}
}

export function setWis(wis) {
	return {
		type: SET_WIS,
		payload: +wis
	}
}

export function setIntel(intel) {
	return {
		type: SET_INTEL,
		payload: +intel
	}
}

export function setCha(cha) {
	return {
		type: SET_CHA,
		payload: +cha
	}
}

export function changeHealth(info){
	return {
		type:CHANGE_CURHEALTH,
		payload: axios.post('/api/health', info)
	}
}

export function setHealthChangeVal(num){
	return {
		type:HEALTH_CHANGE_VAL,
		payload: +num
	}
}

export function setBattleId(val){
	return {
		type: SET_BATTLE_ID,
		payload: val
	}
}