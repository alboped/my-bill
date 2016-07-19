/**
 * 明细页面
 */

import React from 'react';
import { Link, IndexLink } from 'react-router';

/**
 * 明细页切换标签
 */
class Tab extends React.Component {
	render() {
		return (
			<ul className="detail-top-tab clearfix">
				<li className="tab-item">
					<IndexLink to="/detail" 
						activeClassName="active" 
						className="tab-btn">
						账单明细
					</IndexLink>
				</li>
				<li className="tab-item">
					<Link to="/detail/clearing" 
						activeClassName="active" 
						className="tab-btn">
						结算明细
					</Link>
				</li>
			</ul>
		);
	}
}

export default class DetailPage extends React.Component {
	render() {
		return (
			<div className="container">
				<Tab />
				{ this.props.children }
			</div>
		);
	}
}