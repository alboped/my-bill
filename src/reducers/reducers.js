import { combinReducers } from 'redux';
import * as Actions from '../actions/actions';
const { LOGIN_STATE } from Action.LoginState;

let loginState = (state = LOGIN_STATE, action) => {
	switch(action.type) {
		
	}
}

let todos = (state = [], action) => {
	switch(action.type) {
		case Actions.GET_TOTAL_AMOUNT:
			return [
				...state,
				{
					completed: false
				}
			];
		case Actions.GET_LATELY_LIST:
			return [
				...state,
				{
					completed: false
				}
			];
		default:
			return state;
	}
}

const todoApp = combinReducers({
	todos
});

export default todoApp;