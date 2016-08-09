import { combineReducers } from 'redux';
import * as Actions from '../actions/actions';
import * as ActionTypes from '../actions/actionTypes';
// const { LOGIN_STATE } from Action.LoginState;

// let loginState = (state = LOGIN_STATE, action) => {
// 	switch(action.type) {
		
// 	}
// }

const totalAmount = (state = 0, action) => {
	switch (action.type){
		case ActionTypes.GET_TOTAL_AMOUNT:
			return Object.assign({}, satte, {
				totalAmount: Actions.totelAmount	
			});
		default:
			return state;
	}
}

const latelyList = (state = [], action) => {
	switch (action.type){
		case ActionTypes.GET_LATELY_LIST:
			return Object.assign({}, satte, {
				latelyList: Actions.latelyList
			});
		default:
			return state;
	}
}

const rootReducer = combineReducers({
	totalAmount,
	latelyList
});

export default rootReducer;