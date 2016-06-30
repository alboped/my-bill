import React from 'react';
import { render } from 'react-dom';
import { Router, Route, hashHistory } from 'react-router';
import TopBar from './components/common/topBar';

// 加载样式
require('normalize.css');
require('./sass/index.scss');

render(
	<Router history={hashHistory}>
		
	</Router>,
	// <TopBar />,
	document.getElementById('main')
)