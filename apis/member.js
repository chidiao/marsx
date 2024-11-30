import http from './http';

export const getOrderList = (...args) => http.post('/v1/order/lists', ...args);

export const createOrder = ({
  pay_type,
  member_package_uid,
  price
}, ...args) => http.post('/v1/memberPackage/createOrder', {
    pay_type,
    member_package_uid,
    price
  },
  ...args)