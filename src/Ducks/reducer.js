import { combineReducers } from 'redux' 

import shared from './shared'
import gm from './gm'
import player from './player'

export default combineReducers({
	shared, gm, player
})