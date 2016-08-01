/**
 * React 表单校验
 */
import React from 'react';


export default class Form extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			this.props.children
		);
	}
}

/*
 * 输入框组件
 */
class InputText extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<input type="text"/>
		);
	}
}

/*
 * 下拉框组件
 */
class InputSelect extends React.Component {
	constructor(props) {
		super(props);
	}

	/* 遍历下拉列表 */
	getOptions() {
		let options = [];
		this.props.options.map(option => {
			let value = option[this.props.valueKey],
				defaultValue = option[this.props.defaultValue],
				nameKey = option[this.props.nameKey];
			options.push(
				<option value={ value } selected={ value == defaultValue }>
					{ nameKey }
				</option>
			);
		});
		return options;
	}

	render() {
		return (
			<select>
				{ this.getOptions() }
			</select>
		);
	}
}

InputSelect.propTypes = {
	options: React.propTypes.array,
	valueKey: React.propTypes.string,
	nameKey: React.propTypes.string
}