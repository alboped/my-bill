/**
 * 首页
 */

import React from 'react';
import TopBar from './common/topBar';

export default class IndexPage extends React.Component {
	render() {
		return <div>
			<TopBar />
			<p>首页</p>
		</div>;
	}
}