/**
 * 用户操作菜单
 */

import React, { Component } from 'react';

export default class UserHandle extends Component {
	render() {
		return (
			<div className="user-handle">
				<i className="fa fa-caret-up caret-up"></i>
				<ul className="user-handle-list">
					<li>
						<a href="javascript:;" className="handle-item">
							<i className="fa fa-user handle-icon"></i>
							<span className="handle-name">个人中心</span>
						</a>
					</li>
					<li>
						<a href="javascript:;" className="handle-item">
							<i className="fa fa-sign-out handle-icon"></i>
							<span className="handle-name">退&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;出</span>
						</a>
					</li>
				</ul>
			</div>
		);
	}
}