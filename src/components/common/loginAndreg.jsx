/**
 * 登录\注册页面
 */

import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Tooltip from '../../plug/tooltip';
import { classSet } from '../../plug/common';
import * as Mixin from '../../plug/reactMixin';
import $ from 'jquery';

// 业务组件
// import * as home_api from '../api/home'; // 首页接口

export default class LoginAndReg extends Component {
	constructor(props){
		super(props);
		this.state = {
			isLogin: true
		}
	}

	componentWillReceiveProps(nextProps) {
		this.setState({
			isLogin: nextProps.isLogin
		});
	}

	/* 根据showLogin显示登录窗口 */
	isDiaplay() {
		return {
			'display': this.props.showLogin ? 'block' : 'none'
		}
	}

	/* 切换登录、注册窗口 */
	tabToggle(type) {
		this.setState({
			isLogin: type
		});
	}

	render() {
		return (
			<div className="login-model" style={ this.isDiaplay() }>
				<div className="login-bg"></div>
				<div className="login-dialog">
					<a href="javascript:;" 
						className="close-btn" 
						onClick={ this.props.onClose }>×</a>
					<ul className="title-tabs">
						<li>
							<a href="javascript:;" 
								onClick={ this.tabToggle.bind(this, true) }
								className={ this.state.isLogin ? "active" : "" }>
								登录
							</a>
						</li>
						<li>
							<a href="javascript:;" 
								onClick={ this.tabToggle.bind(this, false) } 
								className={ this.state.isLogin ? "" : "active" }>
								注册
							</a>
						</li>
					</ul>
					{ this.state.isLogin ? 
						<LoginForm 
							userLogin={ this.props.userLogin 
						} /> : 
						<RegForm /> 
					}
				</div>
			</div>
		);
	}
}

/**
 * 登录窗口
 */
class LoginForm extends Component {
	constructor(props) {
		super(props);
		this.state = {
			autoLogin: true,   // 选中自动登录
			loginBtnDisabled: false,   // 禁用登录按钮
			email_tooltip_content: '',   // email 提示信息
			email_tooltip_toggle: false,   // email 提示信息显示状态
			pwd_tooltip_content: '',   // 密码提示信息
			pwd_tooltip_toggle: false   // 密码提示信息显示状态
		};
		this.updateState = Mixin.updateState.bind(this);
	}

	/*
	 * 切换自动登录
	 */
	autoLoginToggle() {
		this.updateState({
			autoLogin: !this.state.autoLogin
		});
	}

	/* 登录 */
	userLogin() {
		let email = this.refs.email;
		let password = this.refs.password;

		/* 禁用登录按钮 */
		// this.updateState({
		// 	loginBtnDisabled: true
		// });

		if(email.value == ''){
			let _email = ReactDOM.findDOMNode(email);
			$(_email).addClass('ma-error').focus();
			this.updateState({
				email_tooltip_content: '请输入邮箱！',
				email_tooltip_toggle: true,
				loginBtnDisabled: false
			});
			return false;
		} else if(password.value == ''){
			let _pwd = ReactDOM.findDOMNode(password);
			$(_pwd).addClass('ma-error').focus();
			this.updateState({
				pwd_tooltip_content: '请输入密码！',
				pwd_tooltip_toggle: true,
				loginBtnDisabled: false
			});
			return false;
		}

		this.props.userLogin(email.value, password.value);
	}

	/* 隐藏错误提示 */
	hideTooltip(event, toggle_state) {
		/* 取消错误样式 */
		$(event.target).removeClass('ma-error');

		/* 隐藏错误弹窗 */
		let state = {};
		state[toggle_state] = false;
		this.updateState(state);
	}

	render() {
		// 设置自动登录按钮类名
		let checkClass = classSet({
			'fa-check-square-o': this.state.autoLogin,
			'fa-square-o': !this.state.autoLogin
		});

		return (
			<form className="login-box" onSubmit={ this.userLogin.bind(this) }>
				<Tooltip content={ this.state.email_tooltip_content } 
					visible={ this.state.email_tooltip_toggle } 
					position="bottom-right" 
					className="err-tooltip" 
					bgColor="#eb3232">
					<input type="text" 
						ref="email" 
						className="ma-input form-item input-item" 
						onClick={ this.hideTooltip.bind(this, event, 'email_tooltip_toggle') } 
						onChange={ this.hideTooltip.bind(this, event, 'email_tooltip_toggle') } 
						placeholder="请输入帐号！"
					/>
				</Tooltip>
				<Tooltip content={ this.state.pwd_tooltip_content } 
					visible={ this.state.pwd_tooltip_toggle } 
					position="bottom-right" 
					className="err-tooltip" 
					bgColor="#eb3232">
					<input type="password" 
						ref="password" 
						onClick={ this.hideTooltip.bind(this, event, 'pwd_tooltip_toggle') } 
						onChange={ this.hideTooltip.bind(this, event, 'pwd_tooltip_toggle') } 
						className="ma-input form-item input-item" 
						placeholder="请输入密码！"
					/>
				</Tooltip>
				<button type="submit" 
					className="ma-button ma-success form-item login-btn" 
					disabled={ this.state.loginBtnDisabled }>
					登 录
				</button>
				<div className="login-pwd-bar">
					<div className="left login-auto">
						<a href="javascript:;" className={ 'fa check-toggle ' + checkClass } 
							onClick={ this.autoLoginToggle.bind(this) }>
						</a>
						自动登录
					</div>
					<a href="javascript:;" className="right find-pwd link-underline">忘记密码？</a>
				</div>
				<OtherLogin/>
			</form>
		);
	}
}

/**
 * 注册窗口
 */
class RegForm extends Component {
	constructor(props) {
		super(props);
		this.state = {
			regBtnDisabled: false,   // 禁用注册按钮
			email_tooltip_content: '',   // email 提示信息
			email_tooltip_toggle: true,   // email 提示信息显示状态
			pwd_tooltip_content: '',   // 密码提示信息
			pwd_tooltip_toggle: true   // 密码提示信息显示状态
		};
		this.updateState = Mixin.updateState.bind(this);
	}

	/*
	 * 根据注册 error code 获取错误信息。
	 */
	getRegState(code) {
		return {
			'invalid_email': '无效的邮箱地址！',
			'email_taken': '该邮箱已被注册！'
		}[code];
	}

	/*
	 * 用户注册
	 */
	userReg() {
		// 禁用注册按钮
		this.updateState({
			regBtnDisabled: true
		});
		// home_api.userReg({
		// 	email: this.refs.email.value,
		// 	password: this.refs.pwd.value,
		// 	success: (data) => {
		// 		console.dir(data);
		// 		alert('注册成功！');
		// 	},
		// 	error: (err) => {
		// 		// 启用注册按钮
		// 		this.updateState({
		// 			regBtnDisabled: false,
		// 			email_tooltip_content: this.getRegState(err.code),
		// 			email_tooltip_toggle: true
		// 		});
		// 	}
		// });
		return false;
	}

	render() {
		return (
			<form className="reg-box" onSubmit={ this.userReg.bind(this) }>
				<input type="text" ref="email" className="ma-input form-item input-item" placeholder="请输入帐号！"/>
				<input type="text" ref="pwd" className="ma-input form-item input-item" placeholder="请输入密码！"/>
				<button type="submit" 
					className="ma-button ma-success form-item login-btn" 
					disabled={ this.state.regBtnDisabled }>
					注 册
				</button>
				<OtherLogin/>
			</form>
		);
	}
}

/**
 * 第三方登录
 */
class OtherLogin extends Component {
	render() {
		return (
			<div className="other-bar">
				<p className="other-title">其他方式登录</p>
				<i className="left top-border"></i>
				<i className="right top-border"></i>
				<ul className="other-link-ul">
					<li className="other-item">
						<a href="javascript:;" className="other-link fa fa-qq"></a>
					</li>
					<li className="other-item">
						<a href="javascript:;" className="other-link fa fa-weixin"></a>
					</li>
					<li className="other-item">
						<a href="javascript:;" className="other-link fa fa-weibo"></a>
					</li>
				</ul>
			</div>
		);
	}
}