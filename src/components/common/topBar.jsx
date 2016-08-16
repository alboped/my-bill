/**
 * 头部导航
 */

import React, { Component } from 'react';
import { Link, IndexLink } from 'react-router';
import LoginAndReg from './loginAndreg';
import UserHandle from './userHandle';

export default class TopBar extends Component {
	/*
	 * 登录
	 */
	login() {
		this.setState({
			showLogin: false,
			isLogin: true
		});
	}

	render() {
		return (
			<div className='top-bar-box'>
				<div className='top-bar'>
					<IndexLink to="/"><i className="logo"></i></IndexLink>
					<ul className="bar-list clearfix">
						<li>
							<IndexLink className="bar-btn" activeClassName="active" to="/">首页</IndexLink>
						</li>
						<li>
							<Link className="bar-btn" activeClassName="active" to="/detail">明细</Link>
						</li>
						<li>
							<Link className="bar-btn" activeClassName="active" to="/clearing">结账</Link>
						</li>
					</ul>
					{ this.props.loginState ? 
						<UserBar /> : 
						<LoginBar 
							userLogin={ this.props.userLogin } 
							userReg={ this.props.userReg }
						/> 
					}
				</div>
			</div>
		);
	}
};

/** 
 * 登录、注册操作栏
 */
class LoginBar extends Component {
	constructor(props) {
		super(props);
		this.state = {
			showLogin: true,
			isLogin: false
		}
	}

	/*
	 * 显示登录窗口
	 */
	showLoginModal(type) {
		this.setState({
			showLogin: true,
			isLogin: type
		});
	}

	/*
	 * 关闭登录窗口
	 */
	hideLoginModal() {
		this.setState({
			showLogin: false,
			isLogin: true
		});
	}

	render() {
		return (
			<div>
				<div className="account-handle">
					<a href="javascript:;" onClick={ this.showLoginModal.bind(this, true) }>登录</a>
					<span>|</span>
					<a href="javascript:;" onClick={ this.showLoginModal.bind(this, false) }>注册</a>
				</div>
				<LoginAndReg 
					showLogin={ this.state.showLogin } 
					isLogin={ this.state.isLogin } 
					onClose={ this.hideLoginModal.bind(this) } 
					userLogin={ this.props.userLogin } 
					userReg={ this.props.userReg } 
				/>
			</div>
		);
	}
}

/**
 * 用户信息栏
 */
class UserBar extends Component {
	constructor(props) {
		super(props);
		this.state = {
			photo: '/img/photo.jpeg',
			showHandle: true
		}
	}

	render() {
		return (
			<div className="user-bar">
				<img className="photo" src={ this.state.photo } alt=""/>
				<span className="user-email">shi_zhaojun@aliyun.com <i className="fa fa-angle-down user-down"></i></span>
				{ this.state.showHandle ? <UserHandle /> : null }
			</div>
		);
	}
}