import React from 'react';

export default class TopBar extends React.Component {
	render() {
		return <div className='top-bar-box'>
			<div className='top-bar'>
				<i className="logo"></i>
				<ul className="bar-list clearfix">
					<li><Link className="bar-btn" to="/">首页</Link></li>
					<li><Link className="bar-btn" to="/detail">明细</Link></li>
					<li><Link className="bar-btn" to="/settle-account">结账</Link></li>
				</ul>
			</div>
		</div>;
	}
}