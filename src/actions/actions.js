import * as actionTypes from './actionTypes'; /* actionType */

// import Wilddog from 'wilddog';
// let Wilddog = require("wilddog");

let ref = new Wilddog('https://1257.wilddogio.com/');

/*
 * 登录状态
 */
export const LoginState = {
	LOGIN_STATE: 'LOGIN_STATE', /* 是否已登录 */
	LOGIN_VISIBLE: 'LOGIN_VISIBLE', /* 是否显示登录窗口 */
	LOGIN_TOGGLE: 'LOGIN_TOGGLE'  /* 是否切换到登录窗口 */
}

/*
 * 查询未结算总金额
 */
export const get_total_amount = () => {
	return dispatch => {
		return ref.child('amount').on('value', (data, err) => {
			if(err == null){
				dispatch(returnAmount(data.val()));
			} else {
				console.log('查询金额失败！');
			}
		});
	}
}

/* 接收未结算总金额 */
const returnAmount = (totelAmount) => ({
	type: actionTypes.GET_TOTAL_AMOUNT,
	totelAmount: totelAmount
});

/*
 * 查询最近账单
 */
export const get_lately_list = () => {
	return dispatch => {
		return ref.child('bill').on('value', (data, err) => {
			if(err == null){
				dispatch(returnLatelyList(data.val()));
			} else {
				console.log('查询账单失败！');
			}
		});
	}
}

/* 接收未结算总金额 */
const returnLatelyList = (latelyList) => ({
	type: actionTypes.GET_LATELY_LIST,
	latelyList: latelyList
});