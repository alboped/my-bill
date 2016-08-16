/**
 * 首页相关action
 */

import * as actionTypes from './actionTypes'; /* actionType */
import ref from '../wilddog_ref';

/*
 * 查询未结算总金额
 */
const get_total_amount = () => {
	return dispatch => {
		return ref.child('amount').on('value', (data, err) => {
			if(err == null){
				dispatch(receiveAmount(data.val()));
			} else {
				dispatch(receiveAmount(0));
			}
		});
	}
}

/* 未结算金额查询完成 */
const receiveAmount = totelAmount => ({
	type: actionTypes.GET_TOTAL_AMOUNT_SUCCESS,
	totelAmount
});

/*
 * 查询最近账单
 */
const get_lately_list = () => {
	return dispatch => {
		return ref.child('bill').limitToLast(4).on('value', (data, err) => {
			if(err == null){
				dispatch(receiveLatelyList(data.val()));
			} else {
				dispatch(receiveLatelyList([]));
			}
		});
	}
}

/* 最近账单查询完成 */
const receiveLatelyList = latelyList => ({
	type: actionTypes.GET_LATELY_LIST_SUCCESS,
	latelyList
});

export {
	get_total_amount,
	get_lately_list
}