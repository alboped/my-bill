/**
 * 登录\注册页面
 */

import React, { Component } from 'react';
import Tooltip from '../../plug/tooltip';
import { classSet } from '../../plug/common';
import * as Mixin from '../../plug/reactMixin';
import $ from 'jquery';

/* 第三方组件 */
import { Form, Input, Button } from 'antd';

/* 根据错误码获取错误信息 */
const getStateMsg = code => {
	return {
		'invalid_email': '该邮箱未注册！',
		'invalid_password': '密码错误！',
		'email_taken': '该邮箱已被注册！'
	}[code];
}

export default class LoginAndReg extends Component {
	constructor(props){
		super(props);
		console.log(props);
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
							userLogin={ this.props.userLogin } 
						/> : 
						<RegForm 
							userReg={ this.props.userReg }
						/> 
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
			loginBtnDisabled: false   // 禁用登录按钮
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
	userLogin(e) {
		e.preventDefault();

		/* 禁用注册按钮 */
		this.updateState({
			loginBtnDisabled: true
		});
		this.props.form.validateFields((errors, values) => {
			if(errors){
				/* 启用注册按钮 */
				this.updateState({
					loginBtnDisabled: false
				});
			} else {
				this.props.userLogin(values.email, values.password, (err) => {
					/* 启用注册按钮 */
					this.updateState({
						loginBtnDisabled: false
					});
					if(!!err) {
						let code = err.code;
						let msg = getStateMsg(code);
						let type = code.includes('email') ? 'email' : 'password';

						this.props.form.setFields({
							[type]: {
								value: values[type],
								errors: [new Error(msg)]
							}
						});
					}
				});
			}
		});
	}

	render() {
		// 设置自动登录按钮类名
		let checkClass = classSet({
			'fa-check-square-o': this.state.autoLogin,
			'fa-square-o': !this.state.autoLogin
		});

		const { 
			getFieldProps, 
			getFieldError, 
			isFieldValidating 
		} = this.props.form;

		/* email 校验规则 */
		const emailProps = getFieldProps('email', {
			validate: [{
				rules: [
					{
						required: true,
						message: '邮箱捏？'
					}
				],
				trigger: 'onBlur'
			}, {
				rules: [
					{
						type: 'email',
						message: '请输入正确的邮箱'
					}
				],
				trigger: ['onBlur']
			}]
		});

		/* password 校验规则 */
		const passwordProps = getFieldProps('password', {
			rules: [{
				required: true,
				message: '密码捏？'
			}]
		});

		let validating = isFieldValidating('email');

		let e_errMsg = (getFieldError('email') || []).join(', ');
		let p_errMsg = (getFieldError('password') || []).join(', ');

		return (
			<Form className="login-box" 
				onSubmit={ this.userLogin.bind(this, event) } 
			>
				<Form.Item>
					<Tooltip content={ 
							!validating && e_errMsg 
						} 
						visible={ 
							!!e_errMsg 
						} 
						position="bottom-right" 
						className="err-tooltip" 
						bgColor="#eb3232">
						<Input type="text" 
							{ ...emailProps } 
							type="text" 
							className="ma-input form-item input-item login-input" 
							placeholder="请输入邮箱！" 
						/>
					</Tooltip>
				</Form.Item>
				<Form.Item>
					<Tooltip content={ 
							validating || p_errMsg 
						} 
						visible={
							!!p_errMsg 
						} 
						position="bottom-right" 
						className="err-tooltip" 
						bgColor="#eb3232">
						<Input type="password" 
							{ ...passwordProps } 
							autoComplete="off" 
							className="ma-input form-item input-item login-input" 
							placeholder="请输入密码！"
						/>
					</Tooltip>
				</Form.Item>
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
			</Form>
		);
	}
}
LoginForm = Form.create()(LoginForm);

/**
 * 注册窗口
 */
class RegForm extends Component {
	constructor(props) {
		super(props);
		this.state = {
			regBtnDisabled: false
		};
		this.updateState = Mixin.updateState.bind(this);
	}

	/*
	 * 用户注册
	 */
	userReg(e) {
		e.preventDefault();

		/* 禁用注册按钮 */
		this.updateState({
			regBtnDisabled: true
		});
		this.props.form.validateFields((errors, values) => {
			if(!!errors){
				/* 启用注册按钮 */
				this.updateState({
					regBtnDisabled: false
				});
			} else {
				this.props.userReg(values.email, values.password, (err) => {
					/* 启用注册按钮 */
					this.updateState({
						regBtnDisabled: false
					});
					if(!!err) {
						let code = err.code;
						let msg = getStateMsg(code);
						let type = code.includes('email') ? 'email' : 'password';

						this.props.form.setFields({
							[type]: {
								value: values[type],
								errors: [new Error(msg)]
							}
						});
					}
				});
			}
		});
	}

	render() {
		const { 
			getFieldProps, 
			getFieldError, 
			isFieldValidating 
		} = this.props.form;

		/* email 校验规则 */
		const emailProps = getFieldProps('email', {
			validate: [{
				rules: [
					{
						required: true,
						message: '邮箱捏？'
					}
				],
				trigger: 'onBlur'
			}, {
				rules: [
					{
						type: 'email',
						message: '请输入正确的邮箱'
					}
				],
				trigger: ['onBlur']
			}]
		});

		/* password 校验规则 */
		const passwordProps = getFieldProps('password', {
			rules: [{
				required: true,
				message: '密码捏？'
			}]
		});

		let validating = isFieldValidating('email');

		let e_errMsg = (getFieldError('email') || []).join(', ');
		let p_errMsg = (getFieldError('password') || []).join(', ');

		return (
			<Form className="reg-box" onSubmit={ this.userReg.bind(this) }>
				<Form.Item>
					<Tooltip content={ 
							!validating && e_errMsg 
						} 
						visible={ 
							!!e_errMsg 
						} 
						position="bottom-right" 
						className="err-tooltip" 
						bgColor="#eb3232">
						<Input type="text" 
							{ ...emailProps } 
							className="ma-input form-item input-item login-input" 
							placeholder="请输入邮箱！"
						/>
					</Tooltip>
				</Form.Item>
				<Form.Item>
					<Tooltip content={ 
							!validating && p_errMsg 
						} 
						visible={ 
							!!p_errMsg 
						} 
						position="bottom-right" 
						className="err-tooltip" 
						bgColor="#eb3232">
						<Input type="password" 
							{ ...passwordProps } 
							autoComplete="off" 
							className="ma-input form-item input-item login-input" 
							placeholder="请输入密码！"
						/>
					</Tooltip>
				</Form.Item>
				<button type="submit" 
					className="ma-button ma-success form-item login-btn" 
					disabled={ this.state.regBtnDisabled }>
					注 册
				</button>
				<OtherLogin/>
			</Form>
		);
	}
}
RegForm = Form.create()(RegForm);

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