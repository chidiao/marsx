import http from './http';
export const getGoodsList = (...args) => http.get('/v1/goods/allLists', ...args);
export const getGoodInfo = (goods_uid, ...args) =>
    http.post(
        '/v1/goods/info',
        {
            goods_uid
        },
        ...args
    );
export const createOrder = ({ pay_type = 101, address_id, goods_info }, ...args) =>
    http.post(
        '/v1/mall/createOrder',
        {
            pay_type,
            address_id,
            goods_info: JSON.stringify(goods_info)
        },
        ...args
    );
export const getOrderList = ({ page, page_size = 10 }, ...args) =>
    http.post(
        '/v1/mall/orderList',
        {
            page,
            page_size
        },
        ...args
    );
