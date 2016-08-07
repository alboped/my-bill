import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions/actions';
import TopBar from '../components/common/topBar'; /* 导航 */

/**
 * 根组件
 */
class App extends Component {
	/* 添加props到子组件 */
	setActionToProps() {
		return React.cloneElement(this.props.children, {
			totelAmount: this.props.total_amount,
			lateLyList: this.props.lately_list,
			getTotalAmount: () => this.props.dispatch(actions.get_total_amount()),
			getLatelyList: () => this.props.dispatch(actions.get_lately_list()) 
		});
	}

	render() {
		return (
			<div>
				<TopBar />
				{ this.setActionToProps() }
			</div>
		);
	}
}

export default connect()(App);