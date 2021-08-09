import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import { store } from './app/store';
import App from './App';

import './index.scss';

ReactDOM.render(
	<Provider store={store}>
		<header className="header-container">
			<h1><i className="bi bi-window-sidebar"></i> FakeTrello</h1>
		</header>
		<App />
	</Provider>,
  	document.getElementById('root')
);
