/*
 * action类型 
 */
export const GET_TOTAL_AMOUNT = "GET_TOTAL_AMOUNT"; /* 获取总金额 */
export const GET_LATELY_LIST = "GET_LATELY_LIST"; /* 获取最近订单列表 */

/*
 * 登录状态
 */
export const LoginState = {
	LOGIN_STATE: 'LOGIN_STATE', /* 是否已登录 */
	LOGIN_VISIBLE: 'LOGIN_VISIBLE', /* 是否显示登录窗口 */
	LOGIN_TOGGLE: 'LOGIN_TOGGLE'  /* 是否切换到登录窗口 */
}

/*
 * action创建函数
 */
export const get_total_amount = () => ({ type: GET_TOTAL_AMOUNT });

export const get_lately_list = () => ({ type: GET_LATELY_LIST });