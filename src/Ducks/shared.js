
const initialState = {
	role:'',
	email: '',
	password: ''
}

const SET_ROLE='SET_ROLE'
const EMAIL_INPUT='EMAIL_INPUT'
const PASSWORD_INPUT='PASSWORD_INPUT'

export default function reducer (state = initialState, action){
	switch (action.type) {
		case SET_ROLE:
		return {...state, role:action.payload};

		case EMAIL_INPUT:
		return {...state, email:action.payload};

		case PASSWORD_INPUT:
		return {...state, password:action.payload};

		default:
		return state;
	}
}

export function setRole(type){

	return{
		type: SET_ROLE,
		payload:type
	}
}

export function emailInput(e){
	return {
		type: EMAIL_INPUT,
		payload:e
	}
}

export function passwordInput(e){
	return {
		type: PASSWORD_INPUT,
		payload:e
	}
}