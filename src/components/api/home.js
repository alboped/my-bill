/**
 * 首页接口
 */

// 引入jquery
import $ from 'jquery';
import commonData from './common';

// 数据连接
import conn from './wilddog_connect';

// 用户列表
const userList = commonData.userInfo;

/*
 * 获取未结算总金额
 * success: 查询成功的处理函数；error: 查询失败的处理函数；
 */
export const getTotalAmount = ({ success, error }) => {
	conn.child('amount').on('value', (data, err) => {
		if(err == null){
			success(data.val());
		} else {
			error();
		}
	});
}

/**
 * 获取最近账单列表
 */
export const getLatelyList = ({ success, error }) => {
	conn.child('bill').on('value', (data, err) => {
		if(err == null){
			success(data.val());
		} else {
			error();
		}
	});
}

/**
 * 注册用户
 */
export const userReg = ({ email, password, success, error }) => {
	conn.createUser({
		email: email,
		password: password
	}, (err, data) => {
		if(err == null){
			success(data);
		} else {
			error(err);
		}
	});
}

/** 
 * 登录
 */
export const userLogin = ({ email, password }) => {
	conn.authWithPassword({
		email: email,
		password: password
	}, (err, data) => {
		if(err == null){
			success(data);
		} else {
			error(err);
		}
	});
}