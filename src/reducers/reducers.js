import { combineReducers } from 'redux';
import * as ActionTypes from '../actions/actionTypes';

/* 相关reducers */
import { userData } from './loginReducers';

const totalAmount = (state = 0, action) => {
	switch (action.type){
		case ActionTypes.GET_TOTAL_AMOUNT_SUCCESS:
			return action.totelAmount;
		default:
			return state;
	}
}

const latelyList = (state = [], action) => {
	switch (action.type){
		case ActionTypes.GET_LATELY_LIST_SUCCESS:
			return action.latelyList;
		default:
			return state;
	}
}

const rootReducer = combineReducers({
	totalAmount,
	latelyList,
	userData
});

export default rootReducer;