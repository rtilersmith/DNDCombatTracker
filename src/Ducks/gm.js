const initialState = {
	selected:[]

}

const SET_SELECTED = 'SET_SELECTED'

export default function reducer (state = initialState, action){
	switch (action.type) {

		case SET_SELECTED:
		return {selected: [action.payload]}

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

