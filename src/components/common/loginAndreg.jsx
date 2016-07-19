/**
 * 登录\注册页面
 */

import React from 'react';
import Tooltip from './tooltip';
import { classSet } from '../../plug/common';

// 业务组件
import * as home_api from '../api/home'; // 首页接口

export default class LoginAndReg extends React.Component {
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
					{ this.state.isLogin ? <LoginForm/> : <RegForm/> }
				</div>
			</div>
		);
	}
}

/**
 * 登录窗口
 */
class LoginForm extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			autoLogin: true
		}
	}

	/*
	 * 切换自动登录
	 */
	autoLoginToggle() {
		this.setState({
			autoLogin: !this.state.autoLogin
		});
	}

	render() {
		// 设置自动登录按钮类名
		let checkClass = classSet({
			'fa': true,
			'check-toggle': true,
			'fa-check-square-o': this.state.autoLogin,
			'fa-square-o': !this.state.autoLogin
		});
		return (
			<form className="login-box">
				<input type="text" className="ma-input form-item input-item" placeholder="请输入帐号！"/>
				<input type="text" className="ma-input form-item input-item" placeholder="请输入密码！"/>
				<button type="submit" className="ma-button ma-success form-item login-btn">登 录</button>
				<div className="login-pwd-bar">
					<div className="left login-auto">
						<a href="javascript:;" className={ checkClass } onClick={ this.autoLoginToggle.bind(this) }></a>
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
class RegForm extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			regBtnDisabled: false
		}
	}
	/*
	 * 用户注册
	 */
	userReg() {
		this.setState({
			regBtnDisabled: true
		});
		home_api.userReg({
			email: this.refs.email.value,
			password: this.refs.pwd.value,
			success: (data) => {
				console.dir(data);
				alert('注册成功！');
			},
			error: (err) => {
				this.setState({
					regBtnDisabled: false
				});
				if(err.code == "email_taken"){
					alert('邮箱已被注册！');
				}
			}
		});
		return false;
	}

	render() {
		return (
			<form className="reg-box" onSubmit={ this.userReg.bind(this) }>
				<Tooltip position="bottom-right">
					<input type="text" ref="email" className="ma-input form-item input-item" placeholder="请输入帐号！"/>
				</Tooltip>
				<Tooltip position="bottom-right">
					<input type="text" ref="pwd" className="ma-input form-item input-item" placeholder="请输入密码！"/>
				</Tooltip>
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
class OtherLogin extends React.Component {
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