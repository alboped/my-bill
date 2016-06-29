import React from 'react';

class TopBar extends React.Component {
	render() {
		return <div className='top-bar-box'>
			<div className='top-bar'>
				<i className="logo"></i>
				<ul className="bar-list clearfix">
					<li><a href="#" className="bar-btn">首页</a></li>
					<li><a href="#" className="bar-btn">明细</a></li>
					<li><a href="#" className="bar-btn">结账</a></li>
				</ul>
			</div>
		</div>;
	}
}

export default TopBar;