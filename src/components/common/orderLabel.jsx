/**
 * 订单标签
 */

import React, { Component } from 'react';

// 业务模块
import commonData from '../api/common'; // 公共参数

// 标签数组
const labelList = commonData.labelList;

export default class OrderLabel extends Component {
	constructor(props) {
		super(props);
	}

	// 拼接标签
	pushLabelLi() {
		let labels = [];
		let keyId = 0;
		this.props.labels.map(val => {
			labels.push(<li key={ 'label_' + keyId++ } className="label-item">
				{ labelList[val].name }
			</li>);
		});
		return labels;
	}

	render() {
		return (
			<ul className="label-ul">
				{ this.pushLabelLi() }
			</ul>
		);
	}
}