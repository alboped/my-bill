import React from 'react';
import { render } from 'react-dom';
import { Router, Route, hashHistory } from 'react-router';
import IndexPage from './components/index_page'; // 首页
import DetailPage from './components/detail_page'; // 明细页面

// 加载样式
require('normalize.css');
require('./sass/index.scss');

render(
	<Router history={hashHistory}>
		<Route path='/' component={IndexPage}/>
		<Route path='/detail' component={DetailPage}/>
	</Router>,
	document.getElementById('main')
)