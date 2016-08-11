/**
 * 登录相关
 */

import * as ActionTypes from '../actions/actionTypes';

/* 用户数据 */
const userData = (state = {}, action) => {
	switch (action.type){
		case ActionTypes.POST_LOGIN_SUCCESS:
			return action.userData;
		default:
			return state;
	}
}

export { userData };