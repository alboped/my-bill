/**
 * 拼接类名
 */
export let classSet = (classObj) => {
	let classStr = "";
	for(let className in classObj){
		if(classObj[className]) classStr += className + ' ';
	}
	return classStr.trim();
}