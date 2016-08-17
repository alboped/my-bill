/**
 * 头部导航
 */

import React, { Component } from 'react';
import { Link, IndexLink } from 'react-router';
import LoginAndReg from './loginAndreg';
import UserHandle from './userHandle';

export default class TopBar extends Component {
	componentDidMount() {
		this.props.authLogin();
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
						<UserBar 
							unauth={ this.props.unauth }
						/> : 
						<LoginBar 
							showLogin={ this.props.showLogin } 
							userLogin={ this.props.userLogin } 
							userReg={ this.props.userReg } 
							toggleLogin={ this.props.toggleLogin }
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
	render() {
		return (
			<div>
				<div className="account-handle">
					<a href="javascript:;" onClick={ this.props.toggleLogin.bind(this, true, true) }>登录</a>
					<span>|</span>
					<a href="javascript:;" onClick={ this.props.toggleLogin.bind(this, true, false) }>注册</a>
				</div>
				<LoginAndReg 
					showLogin={ this.props.showLogin } 
					isLogin={ this.props.isLogin } 
					onClose={ this.props.toggleLogin.bind(this, false, true) } 
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
				<span className="user-email">shi_zhaojun@aliyun.com 
					<i className="fa fa-angle-down user-down"></i>
				</span>
				{ 
					this.state.showHandle 
						? <UserHandle unauth={ this.props.unauth }/> 
						: null 
				}
			</div>
		);
	}
}