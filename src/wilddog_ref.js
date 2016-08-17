/**
 * 引入wilddog并连接
 */

// import Wilddog from 'wilddog';

const appId = 1257;

const ref = new Wilddog('https://' + appId + '.wilddogio.com/');

export { appId };
export default ref;