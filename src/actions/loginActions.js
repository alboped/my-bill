/**
 * 登录相关action
 */
import * as actionTypes from './actionTypes'; /* actionType */
import ref from '../wilddog_ref';

/* 根据错误码获取错误信息 */
const getStateMsg = code => {
	return {
		'invalid_email': '邮箱验证失败！',
		'invalid_password': '密码错误',
		'email_taken': '该邮箱已被注册！'
	}[code];
}

/*
 *
 * 登录
 *
 */
/* 用户登录 */
const userLogin = (email, password, callback) => {
	return dispatch => {
		return ref.authWithPassword({
			email,
			password
		}, (err, data) => {
			callback(err);
			console.log(err);
			console.log(data);
			dispatch(loginSuccess(!!!err));
		});
	}
}

/* 登录完成 */
const loginSuccess = loginState => ({
	type: actionTypes.POST_LOGIN_SUCCESS,
	loginState
});

/*
 *
 * 注册
 *
 */
/* 创建用户 */
const userReg = (email, password, callback) => {
	return dispatch => {
		return ref.createUser({
			email,
			password
		}, (err, data) => {
			callback(err);

			err ? 
			dispatch(regError(err)) : 
			dispatch(regSuccess(data))
		});
	}
}

/* 注册成功 */
const regSuccess = data => ({
	type: actionTypes.POST_REG_SUCCESS
});

/* 注册失败 */
const regError = err => ({
	type: actionTypes.POST_REG_FAILURE
});

export { 
	userLogin, 
	userReg 
};