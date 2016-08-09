import React, { Component } from 'react';
import { render } from 'react-dom';
import { Router, Route, IndexRoute, hashHistory } from 'react-router';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import rootReducer from './reducers/reducers';
import App from './containers/App';
import thunkMiddleware from 'redux-thunk'; 
import createLogger from 'redux-logger';

/* 业务组件 */
import HomePage from './components/home_page'; // 首页
import DetailPage from './components/detail/detail_page'; // 明细页面
import OrderDetail from './components/detail/order_detail'; // 账单明细
import ClearingDetail from './components/detail/clearing_detail'; // 结算明细
import ClearingPage from './components/clearing/clearing_page'; // 结算页面

/* 加载样式 */
require('normalize.css');
require('./sass/main.scss');

/* font-awesome 图标 */
require('font-awesome-webpack');

const loggerMiddleware = createLogger();

/* 创建store */
let store = createStore(
	rootReducer,
	applyMiddleware(
		thunkMiddleware,
		loggerMiddleware
	)
);

render(
	<Provider store={ store }>
		<Router history={ hashHistory }>
			<Route path='/' component={ App }>
				<IndexRoute component={ HomePage }/>
				<Route path='/detail' component={ DetailPage }>
					<IndexRoute component={ OrderDetail }/>
					<Route path='/detail/clearing' component={ ClearingDetail }/>
				</Route>
				<Route path='/clearing' component={ ClearingPage }/> 
			</Route>
		</Router>
	</Provider>,
	document.getElementById('main')
)