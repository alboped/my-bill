/**
 * 登录相关
 */

import * as ActionTypes from '../actions/actionTypes';

/* 用户数据 */
const loginState = (state = false, action) => {
	switch (action.type){
		case ActionTypes.POST_LOGIN_SUCCESS:
			return action.loginState;
		default:
			return state;
	}
}

export { loginState };