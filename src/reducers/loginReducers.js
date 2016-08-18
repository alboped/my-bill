/**
 * 登录相关
 */

import * as At from '../actions/actionTypes';

/* 用户数据 */
const loginState = (state = false, action) => {
	switch (action.type){
		case At.POST_LOGIN_SUCCESS:
			return action.loginState;
		default:
			return state;
	}
}

/* 打开、关闭登录窗口 */
const toggleLogin = (state = false, action) => {
	console.log(12561242);
	switch (action.type){
		case At.SHOW_LOGIN_TOGGLE:
			return Object.assign({}, state, action.toggleLogin);
		default:
			return state;
	}
}

export { loginState, toggleLogin };