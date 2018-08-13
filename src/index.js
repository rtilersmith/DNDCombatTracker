import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {HashRouter as Router } from 'react-router-dom'
import { Provider } from 'react-redux'
import store from './Ducks/store'

ReactDOM.render(
	<Provider store={store}>
		<Router>
			<App />
		</Router>
	</Provider>
, document.getElementById('root'));
