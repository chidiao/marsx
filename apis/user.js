import http from './http';

// 拿手机号授权 => 注册
export const wechatRegister = ({ js_code, wx_open_id }, ...args) =>
    http.post(
        '/v1/user/wechatMobileSupplement',
        {
            js_code,
            wx_open_id
        },
        ...args
    );

// 1. 已注册，直接登录
// 2. 未注册，需要手机号授权 => 注册
export const wechatLogin = (js_code, ...args) =>
    http.post(
        '/v1/user/wechatLogin',
        {
            js_code
        },
        ...args
    );
export const getUserInfo = (...args) => http.get('/v1/user/info', ...args);
