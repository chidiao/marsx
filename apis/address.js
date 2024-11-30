import http from './http';
export const getRegions = (region_code, ...args) =>
    http.post(
        '/v1/region/info',
        {
            region_code
        },
        ...args
    );
export const getAddressList = (...args) => http.get('/v1/address/lists', ...args);
