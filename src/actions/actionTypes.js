/**
 * action类型 
 */

/* 首页相关actions */
export const GET_TOTAL_AMOUNT = "GET_TOTAL_AMOUNT"; /* 获取总金额 */
export const GET_LATELY_LIST = "GET_LATELY_LIST"; /* 获取最近订单列表 */
export const GET_TOTAL_AMOUNT_SUCCESS = "GET_TOTAL_AMOUNT_SUCCESS"; /* 未结算金额查询完成 */
export const GET_LATELY_LIST_SUCCESS = "GET_LATELY_LIST_SUCCESS"; /* 最近账单查询完成 */

/* 登录相关actions */
export const POST_LOGIN_SUCCESS = "POST_LOGIN_SUCCESS"; /* 登录成功 */
export const POST_LOGIN_FAILURE = "POST_LOGIN_FAILURE"; /* 登录失败 */
export const POST_REG_SUCCESS = "POST_REG_SUCCESS"; /* 注册成功 */
export const POST_REG_FAILURE = "POST_REG_FAILURE"; /* 注册失败 */

export const POST_AUTO_LOGIN_SUCCESS = "POST_AUTO_LOGIN_SUCCESS"; /* 自动登录成功 */
export const SHOW_LOGIN_TOGGLE = "SHOW_LOGIN_TOGGLE"; /* 显示登录窗口 */