/**
 * 修改state
 */
export let updateState = function(stateObject){
	let state = this.state;
	for(let stateItem in stateObject){
		state[stateItem] = stateObject[stateItem];
	}
	this.setState(state);
}