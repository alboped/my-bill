/**
 * 文字提示框
 */

import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';

// 提示框位置
const position = [
	'top',
	'left',
	'right',
	'bottom',
	'top-left',
	'top-right',
	'left-top',
	'left-bottom',
	'right-top',
	'right-bottom',
	'bottom-left',
	'bottom-right'
];

// const tooltipDialog = {
// 	position: 'rel'
// }

export default class Tooltip extends React.Component {
	constructor(props) {
		super(props);
		this.divElement = $('<div />');
	}

	componentDidMount() {
		/* 向body添加组件 */
		$('body').append(this.divElement);
		ReactDOM.render(<TooltipDialog/>, this.divElement[0]);

		/* 给目标元素绑定事件 */
		console.log($(this.props.children));
	}

	componentWillUnmount() {
		/* 删除组件元素 */
		this.divElement.remove();
	}

	render() {
		return (
			<div>
				{ this.props.children }
			</div>
		);
	}
}

/*
 * 提示窗口
 */
class TooltipDialog extends React.Component {
	render() {
		return (
			<div></div>
		);
	}
}