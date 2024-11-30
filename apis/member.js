import http from './http';
export const getOrderList = (...args) => http.post('/v1/order/lists', ...args);
