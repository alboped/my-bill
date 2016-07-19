import React from 'react';

const options = [{
	value: 'zhejiang',
	label: '浙江',
	children: [{
		value: 'hangzhou',
		label: '杭州',
		children: [{
			value: 'xihu',
			label: '西湖',
		}],
	}],
}, {
	value: 'jiangsu',
	label: '江苏',
	children: [{
		value: 'nanjing',
		label: '南京',
		children: [{
			value: 'zhonghuamen',
			label: '中华门',
		}],
	}],
}];

const boxClass = {
	width: '100%', 
	height: '100%'
};

export default class Cascader extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			visible: false
		}
	}

	/*
	 * 打开级联菜单
	 */
	openList() {
		this.setStete({
			visible: true
		});
	}

	render() {
		return <div { ...this.props }>
			<input type="text" style={ boxClass } onClick={ this.openList.bind(this) }/>
			<Tree options={ this.props.options } visible={ this.state.visible }/>
		</div>;
	}
}

class TreeAll extends React.Component {
	constructor(props) {
		super(props);
	}

	appendTree(options) {
		let tree = [];
		// options.map(data => {
		// 	if(data.children){
		// 		tree.push(<li><span>{ data.label }</span>{ this.appendTree(data.children) }</li>);
		// 	} else {
		// 		tree.push(<li><span>{ data.label }</span></li>);
		// 	}
		// });
		return <Tree options={ tree }></Tree>;
	}

	render() {
		return this.appendTree(this.props.options);
	}
}

class Tree extends React.Component {
	appendTree(options) {
		let tree = [];
		this.props.options.map(data => {
			tree.push(<li><span>{ data.label }</span></li>);
		});
		return tree;
	}

	render() {
		return <ul>{ this.appendTree() }</ul>;
	}
}