import React from 'react'
import { Switch, Route } from 'react-router-dom'
import Landing from './Components/Landing/Landing'
import Login from './Components/Login/Login'
import GMSetUp from './Components/GMSetUp/GMSetUp'
import CombatPage from './Components/CombatPage/CombatPage'
import PlayerSetUp from './Components/PlayerSetUp/PlayerSetUp'

export default function Routes (){
	return (
		<Switch>
			<Route exact path='/' component={Landing} />
			<Route path='/login' component={Login} />
			<Route path='/gm' component={GMSetUp} />
			<Route path='/playersetup' component={PlayerSetUp} />
			<Route path='/combat' component={CombatPage} />
			{/* <Route path='/selected' */}
		</Switch>
	)
}