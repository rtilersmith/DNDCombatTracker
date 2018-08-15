import { combineReducers } from 'redux' 

import shared from './shared'
import gm from './gm'
import player from './player'
import enemy from './enemy'

export default combineReducers({
	shared, gm, player, enemy
})