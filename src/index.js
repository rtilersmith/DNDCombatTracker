import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {HashRouter as Router } from 'react-router-dom'
import { Provider } from 'react-redux'
import io from 'socket.io-client'
import { SocketProvider } from 'socket.io-react'
import store from './Ducks/store'

const socket = io.connect(process.env.REACT_APP_SOCKET_URL)

ReactDOM.render(
	<SocketProvider socket={socket}>
		<Provider store={store}>
			<Router>
				<App />
			</Router>
		</Provider>
	</SocketProvider>
, document.getElementById('root'));
