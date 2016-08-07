/**
 * 文字提示框
 */

import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import { classSet } from './common';

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

/*
 * 根据position属性获取元素的位置属性。
 */
const getPosition = (props, thisNode) => {
	/* 初始化结果位置 */
	let box = { top: 0, left: 0 },
		arrow = '';

	/* 判断窗口是否显示 */
	if(props.visible){
		/* 获取位置及目标元素 */
		let place = props.position;
		let node = props.node;
		let offset = $(node).offset();

		/* 获取目标元素大小及位置 */
		let _width = node.offsetWidth;
		let _height = node.offsetHeight;
		let _top = offset.top;
		let _left = offset.left;

		/* 获取提示框元素大小 */
		let _thisWidth = thisNode.offsetWidth;
		let _thisHeight = thisNode.offsetHeight;

		/* 偏移距离 */
		let gap = 8;

		/* 预设结果位置 */
		let lrt = _top + gap,
			lrc = _top + _height/2 - _thisHeight/2,
			lrb = _top + _height - _thisHeight - gap,
			lrl = _left - _thisWidth - gap,
			lrr = _left + _width + gap,
			tbt = _top - _thisHeight - gap,
			tbb = _top + _height + gap,
			tbl = _left + gap,
			tbc = _left + _width/2 - _thisWidth/2,
			tbr = _left + _width - _thisWidth - gap;

		/* 预设箭头位置 */
		let alrt = 0;

		/* 获取窗口位置属性对应下标 */
		let pindex = position.indexOf(place);

		/* 设置箭头样式类 */
		arrow = pindex <= 0 ? 'top' : place;

		switch(pindex){
			case 1: box = { top: lrc, left: lrl }; break;
			case 2: box = { top: lrc, left: lrr }; break;
			case 3: box = { top: tbb, left: tbc }; break;
			case 4: box = { top: tbt, left: tbl }; break;
			case 5: box = { top: tbt, left: tbr }; break;
			case 6: box = { top: lrt, left: lrl }; break;
			case 7: box = { top: lrb, left: lrl }; break;
			case 8: box = { top: lrt, left: lrr }; break;
			case 9: box = { top: lrc, left: lrr }; break;
			case 10: box = { top: tbb, left: tbl }; break;
			case 11: box = { top: tbb, left: tbr }; break;
			default: box = { top: tbt, left: tbc }; break;
		}
	}
	return { box, arrow};
};

export default class Tooltip extends React.Component {
	constructor(props) {
		super(props);
		/* 创建提示框元素 */
		this.divElement = $('<div />');
	}

	componentDidMount() {
		/* 获取当前组件DOM元素 */
		this.node = ReactDOM.findDOMNode(this);

		/* 向body添加提示框组件 */
		$('body').append(this.divElement);
		this.renderTooltipDiv(this.props);
	}

	componentWillUnmount() {
		/* 组件移除时删除提示框元素 */
		this.divElement.remove();
	}

	componentWillReceiveProps(nextProps) {
		/* props 更新时重新渲染提示框 */
		this.renderTooltipDiv(nextProps);
	}

	/*
	 * 渲染tooltip弹框
	 */
	renderTooltipDiv(props) {
		ReactDOM.render(
			<TooltipDialog { ...props } node={ this.node }/>,
			this.divElement[0]
		);
	}

	render() {
		return this.props.children;
	}
}

/* 提示框props 校验 */
Tooltip.propTypes = {
	content: React.PropTypes.string.isRequired
}

/*
 * 提示窗口
 */
class TooltipDialog extends React.Component {
	componentDidUpdate() {
		if(this.props.visible){
			let thisNode = ReactDOM.findDOMNode(this);
			let position = getPosition(this.props, thisNode);
			$(thisNode).css(position.box);
			$('.tooltip-arrow', thisNode).addClass(position.arrow);
		}
	}

	render() {
		/* 设置弹窗样式 */
		let style = {
			display: this.props.visible ? 'block' : 'none',
			background: this.props.bgColor
		};

		let arrowStyle = {
			borderColor: this.props.bgColor
		}

		return (
			<div className={ 'tooltip-dialog ' + this.props.className } style={ style }>
				<div className="tooltip-arrow" style={ arrowStyle }></div>
				{ this.props.content }
			</div>
		);
	}
}