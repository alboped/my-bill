/**
 * 登录相关action
 */
import * as actionTypes from './actionTypes'; /* actionType */
import ref from '../wilddog_ref';

/* 用户登录 */
const userLogin = (email, password) => {
	console.log(email);
	console.log(password);
	return dispatch => {
		return ref.authWithPassword({
			email,
			password
		}, (err, data) => {
			err ? dispatch(loginError(err)) : dispatch(loginSuccess(data));
		});
	}
}

/* 登录成功 */
const loginSuccess = userData => ({
	type: actionTypes.POST_LOGIN_SUCCESS,
	userData
});

/* 登录失败 */
const loginError = loginError => ({
	type: actionTypes.POST_LOGIN_FAILURE,
	loginError
});

export { userLogin };