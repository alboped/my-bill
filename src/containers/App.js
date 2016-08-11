import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

/* 相关actions */
import * as homeActions from '../actions/homeActions';
import * as loginActions from '../actions/loginActions';

/* 业务组件 */
import TopBar from '../components/common/topBar'; /* 导航 */

/**
 * 根组件
 */
class App extends Component {
	render() {
		/* 添加props到子组件 */
		let children = React.cloneElement(this.props.children, {
			totalAmount: this.props.totalAmount,
			latelyList: this.props.latelyList,
			getTotalAmount: () => this.props.dispatch(
				homeActions.get_total_amount()
			),
			getLatelyList: () => this.props.dispatch(
				homeActions.get_lately_list()
			) 
		});
		return (
			<div>
				<TopBar 
					userData={ this.props.userData } 
					userLogin={ (userName, password) => 
						this.props.dispatch(
							loginActions.userLogin(userName, password)
						)
					} 
				/>
				{ children }
			</div>
		);
	}
}

const updateProps = (state) => {
	let { totalAmount, latelyList, userData } = state;
	return {
		totalAmount,
		latelyList,
		userData
	}
};

export default connect(updateProps)(App);