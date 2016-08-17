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
					showLogin={ this.props.showLogin } 
					toggleLogin={ (isShow, isLogin) => 
						this.props.dispatch(
							loginActions.toggleLogin(isShow, isLogin)
						)
					} 
					loginState={ this.props.loginState } 
					userLogin={ (email, password, callback) => 
						this.props.dispatch(
							loginActions.userLogin(email, password, callback)
						)
					} 
					userReg={ (email, password, callback) =>
						this.props.dispatch(
							loginActions.userReg(email, password, callback)
						)
					} 
					authLogin={ () => 
						this.props.dispatch(
							loginActions.authLogin()
						)
					} 
					unauth={ () => 
						this.props.dispatch(
							loginActions.unauth()
						)
					}
				/>
				{ children }
			</div>
		);
	}
}

const updateProps = (state) => {
	let { totalAmount, latelyList, loginState } = state;
	return {
		totalAmount,
		latelyList,
		loginState
	}
};

export default connect(updateProps)(App);