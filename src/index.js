import React from 'react';
import { render } from 'react-dom';
import TopBar from './components/common/topBar';

// 加载样式
require('./sass/index.scss');

render(
	<TopBar />,
	document.getElementById('main')
)