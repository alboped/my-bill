import * as actionTypes from './actionTypes'; /* actionType */

// import Wilddog from 'wilddog';
// let Wilddog = require("wilddog");

let ref = new Wilddog('https://1257.wilddogio.com/');

/*
 * 登录状态
 */
// export const LoginState = {
// 	LOGIN_STATE: 'LOGIN_STATE', /* 是否已登录 */
// 	LOGIN_VISIBLE: 'LOGIN_VISIBLE', /* 是否显示登录窗口 */
// 	LOGIN_TOGGLE: 'LOGIN_TOGGLE'  /* 是否切换到登录窗口 */
// }

const requestAmount = () => ({
	type: actionTypes.GET_TOTAL_AMOUNT_REQUEST,
	totelAmount: 0
});

const receiveAmount = (totelAmount) => ({
	type: actionTypes.GET_TOTAL_AMOUNT_SUCCESS,
	totelAmount
});

/*
 * 查询未结算总金额
 */
export const get_total_amount = () => {
	return dispatch => {
		dispatch(requestAmount());
		return ref.child('amount').on('value', (data, err) => {
			if(err == null){
				dispatch(receiveAmount(data.val()));
			} else {
				dispatch(receiveAmount(0));
			}
		});
	}
}

const requestLatelyList = () => ({
	type: actionTypes.GET_LATELY_LIST_REQUEST,
	latelyList: []
});

const receiveLatelyList = (latelyList) => ({
	type: actionTypes.GET_LATELY_LIST_SUCCESS,
	latelyList
});

/*
 * 查询最近账单
 */
export const get_lately_list = () => {
	return dispatch => {
		dispatch(requestLatelyList());
		return ref.child('bill').on('value', (data, err) => {
			if(err == null){
				dispatch(receiveLatelyList(data.val()));
			} else {
				dispatch(receiveLatelyList([]));
			}
		});
	}
}