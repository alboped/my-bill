import { combineReducers } from 'redux';
import * as Actions from '../actions/actions';
import * as ActionTypes from '../actions/actionTypes';
// const { LOGIN_STATE } from Action.LoginState;

// let loginState = (state = LOGIN_STATE, action) => {
// 	switch(action.type) {
		
// 	}
// }

const total_amount = (state = 0, action) => {
	switch (action.type){
		case ActionTypes.GET_TOTAL_AMOUNT:
			return Actions.totelAmount;
		default:
			return state;
	}
}

const lately_list = (state = [], action) => {
	switch (action.type){
		case ActionTypes.GET_LATELY_LIST:
			return Actions.latelyList;
		default:
			return state;
	}
}

const rootReducer = combineReducers({
	total_amount,
	lately_list
});

export default rootReducer;