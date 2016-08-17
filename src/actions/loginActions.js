/**
 * 登录相关action
 */
import * as At from './actionTypes'; /* actionType */
import ref, { appId } from '../wilddog_ref';

/* 根据错误码获取错误信息 */
const getStateMsg = code => {
	return {
		'invalid_email': '邮箱验证失败！',
		'invalid_password': '密码错误',
		'email_taken': '该邮箱已被注册！'
	}[code];
}

/**
 * 打开、关闭登录窗口
 */
const toggleLogin = (showLogin, isLogin) => ({
	type: At.SHOW_LOGIN_TOGGLE,
	showLogin,
	isLogin
});

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
			!err && dispatch(loginSuccess(true));
		});
	}
}

/* 登录完成 */
const loginSuccess = loginState => ({
	type: At.POST_LOGIN_SUCCESS,
	loginState
});

/**
 * 获取token自动登录
 */
const authLogin = () => {
	return dispatch => {
		const sessionString = window.localStorage['wilddog:session::' + appId];
		if(sessionString){
			const sessionObject = JSON.parse(sessionString);
			return ref.authWithCustomToken(sessionObject.token, (err, data) => {
				!err && dispatch(loginSuccess(true));
			});
		}
	}
}

/**
 * 注销登录
 */
const unauth = () => {
	ref.unauth();
	window.location.reload();
}

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

			err 
			? dispatch(regError(err)) 
			: dispatch(regSuccess(data))
		});
	}
}

/* 注册成功 */
const regSuccess = data => ({
	type: At.POST_REG_SUCCESS
});

/* 注册失败 */
const regError = err => ({
	type: At.POST_REG_FAILURE
});

export { 
	userLogin, 
	userReg,
	authLogin,
	toggleLogin,
	unauth
};